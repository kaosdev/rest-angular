import {Inject, InjectionToken, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PathParserFactory, StandardPathParserFactory} from './http/path-parser/path-parser-factory';
import {BodyParser} from './http/body-parser/body-parser';
import {PathParameterParser} from './http/path-parser/path-parser';
import {BodyParserFactory, StandardBodyParserFactory} from './http/body-parser/body-parser-factory';
import {EndpointMetadata} from './utils/endpoint-metadata';
import {MetadataTarget} from './utils/metadata-target';

export const REST_BASE_URL = new InjectionToken<string>(null);

export class MissingRestBaseUrlError extends Error {

  constructor() {
    super('REST_BASE_URL not provided');
  }
}

export const BASE_URL_META = 'base-url';

export interface RestEndpoint {
  templatePath: string;
  pathParametersName: string[];
  bodyParamIndex: number;
}

export abstract class RestAngularClient {
  private endpointMeta: EndpointMetadata;
  private metadataTarget: MetadataTarget;

  private readonly pathParamParserFactory: PathParserFactory;
  private readonly bodyParserFactory: BodyParserFactory;

  private endpointMap: Record<string, RestEndpoint> = {};
  public readonly pathParserMap: Record<string, PathParameterParser> = {};
  public readonly bodyParserMap: Record<string, BodyParser> = {};

  public readonly baseUrl: string;

  constructor(
    @Inject(HttpClient)
    public httpClient: HttpClient,
    @Optional()
    @Inject(REST_BASE_URL)
    protected injectedBaseUrl: string,
    @Optional()
    @Inject(PathParserFactory) injectedPathParamParserFactory: PathParserFactory,
    @Optional()
    @Inject(BodyParserFactory) injectedBodyParserFactory: BodyParserFactory,
  ) {
    this.pathParamParserFactory = this.injectedOrStandard(injectedPathParamParserFactory, StandardPathParserFactory);
    this.bodyParserFactory = this.injectedOrStandard(injectedBodyParserFactory, StandardBodyParserFactory);

    this.setParsersFromEndpointMap();

    this.baseUrl = this.getInjectedOrMetadata(injectedBaseUrl, BASE_URL_META, MissingRestBaseUrlError);
  }

  private injectedOrStandard<T>(injected: T, standard: new () => T): T {
    return injected || new standard();
  }

  private setParsersFromEndpointMap() {
    this.metadataTarget = new MetadataTarget(this);
    this.endpointMeta = new EndpointMetadata(this.metadataTarget);
    this.endpointMap = this.endpointMeta.getAll();

    Object.keys(this.endpointMap).forEach(methodKey => {
      const endpoint: RestEndpoint = this.endpointMap[methodKey];
      this.pathParserMap[methodKey] = this.getPathParamParser(endpoint.templatePath, methodKey);
      this.bodyParserMap[methodKey] = this.getBodyParser(methodKey);
    });
  }

  private getInjectedOrMetadata<T>(injected: T, metadataKey: string, error: new () => Error): T {
    const metadataValue: T = this.metadataTarget.getMetadata(metadataKey);

    if (metadataValue) {
      return metadataValue;
    } else if (injected) {
      return injected;
    } else {
      throw new error();
    }
  }

  private getPathParamParser(path: string, methodKey: string): PathParameterParser {
    return this.pathParamParserFactory.makeParser(path, this.getPathParams(methodKey));
  }

  private getBodyParser(methodKey: string): BodyParser {
    return this.bodyParserFactory.makeParser(this.getBodyParam(methodKey));
  }

  private getPathParams(methodKey: string): string[] {
    const endpoint = this.endpointMeta.get(methodKey);
    return endpoint.pathParametersName;
  }

  private getBodyParam(methodKey: string): any {
    const endpoint = this.endpointMeta.get(methodKey);
    return endpoint.bodyParamIndex;
  }
}
