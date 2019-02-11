import {Inject, InjectionToken, Injector, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PathParserFactory, StandardPathParserFactory} from './http/path-parser/path-parser-factory';
import {BodyParser} from './http/body-parser/body-parser';
import {PathParameterParser} from './http/path-parser/path-parser';
import {BodyParserFactory, StandardBodyParserFactory} from './http/body-parser/body-parser-factory';
import {EndpointMetadata} from './utils/endpoint-metadata';
import {MetadataTarget} from './utils/metadata-target';
import {MissingInjectionError} from './errors/missing-injection-error';
import {RestCallHandler} from './http/rest-call-handler/rest-call-handler';
import {HandleRestMethodFunction} from './factories/method-decorator-factory';
import {Observable} from 'rxjs';
import {QueryParserFactory, StandardQueryParserFactory} from './http/query-parser/query-parser-factory';
import {QueryParser} from './http/query-parser/query-parser';

export const REST_BASE_URL = new InjectionToken<string>('Base url');
export const BASE_URL_META = 'base-url';

export interface RestEndpoint {
  methodName: string;
  templatePath: string;
  pathParameterNames: string[];
  queryParameterNames: string[];
  bodyParamIndex: number;
  handleCall: HandleRestMethodFunction;
}

export abstract class RestAngularClient {
  private endpointMeta: EndpointMetadata;
  private readonly metadataTarget: MetadataTarget;

  private readonly pathParamParserFactory: PathParserFactory;
  private readonly bodyParserFactory: BodyParserFactory;
  private readonly queryParserFactory: QueryParserFactory;

  private readonly endpointMap: Record<string, RestEndpoint> = {};
  private readonly callHandlerMap: Record<string, RestCallHandler> = {};

  public readonly baseUrl: string;

  constructor(
    @Inject(HttpClient)
    public httpClient: HttpClient,
    @Inject(Injector)
    private injector: Injector,
    @Optional()
    @Inject(REST_BASE_URL)
    protected injectedBaseUrl: string,
    @Optional()
    @Inject(PathParserFactory) injectedPathParamParserFactory: PathParserFactory,
    @Optional()
    @Inject(BodyParserFactory) injectedBodyParserFactory: BodyParserFactory,
    @Optional()
    @Inject(QueryParserFactory) injectedQueryParserFactory: QueryParserFactory,
  ) {
    this.metadataTarget = new MetadataTarget(this);
    this.endpointMeta = new EndpointMetadata(this.metadataTarget);
    this.endpointMap = this.endpointMeta.getAll();

    this.pathParamParserFactory = this.injectedOrStandard(injectedPathParamParserFactory, StandardPathParserFactory);
    this.bodyParserFactory = this.injectedOrStandard(injectedBodyParserFactory, StandardBodyParserFactory);
    this.queryParserFactory = this.injectedOrStandard(injectedQueryParserFactory, StandardQueryParserFactory);
    this.baseUrl = this.getInjectedOrMetadata(REST_BASE_URL, BASE_URL_META);

    this.setParsersFromEndpointMap();
  }

  public makeRequest<T>(methodKey: string, args: any[]): Observable<T> {
    const request = this.callHandlerMap[methodKey].getRequest(args);
    const endpoint = this.endpointMap[methodKey];

    return endpoint.handleCall(this.httpClient, request);
  }

  private injectedOrStandard<T>(injected: T, standard: new () => T): T {
    return injected || new standard();
  }

  private getInjectedOrMetadata<T>(injectionToken: InjectionToken<T>, metadataKey: string): T {
    const metadataValue: T = this.metadataTarget.getMetadata(metadataKey);
    const injected = this.injector.get(injectionToken, null);

    if (metadataValue) {
      return metadataValue;
    } else if (injected) {
      return injected;
    } else {
      throw new MissingInjectionError(injectionToken);
    }
  }

  private setParsersFromEndpointMap() {
    Object.keys(this.endpointMap).forEach(methodKey => {
      const endpoint: RestEndpoint = this.endpointMap[methodKey];
      const pathParser = this.getPathParamParser(endpoint.templatePath, methodKey);
      const bodyParser = this.getBodyParser(methodKey);
      const queryParser = this.getQueryParser(methodKey);
      this.callHandlerMap[methodKey] = new RestCallHandler(pathParser, bodyParser, queryParser);
    });
  }

  private getPathParamParser(path: string, methodKey: string): PathParameterParser {
    return this.pathParamParserFactory.makeParser(this.baseUrl, path, this.getPathParams(methodKey));
  }

  private getBodyParser(methodKey: string): BodyParser {
    return this.bodyParserFactory.makeParser(this.getBodyParam(methodKey));
  }

  private getQueryParser(methodKey: string): QueryParser {
    return this.queryParserFactory.makeParser(this.getQueryParams(methodKey));
  }

  private getPathParams(methodKey: string): string[] {
    const endpoint = this.endpointMeta.get(methodKey);
    return endpoint.pathParameterNames;
  }

  private getBodyParam(methodKey: string): any {
    const endpoint = this.endpointMeta.get(methodKey);
    return endpoint.bodyParamIndex;
  }

  private getQueryParams(methodKey: string): string[] {
    const endpoint = this.endpointMeta.get(methodKey);
    return endpoint.queryParameterNames;
  }
}
