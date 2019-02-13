import {Inject, InjectionToken, Injector} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BodyParserFactory, StandardBodyParserFactory} from './http/body-parser/body-parser-factory';
import {EndpointMetadata} from './metadata/endpoint-metadata';
import {MetadataTarget} from './metadata/metadata-target';
import {Observable} from 'rxjs';
import {ParameterParserFactory} from './types/parameter-parser';
import {RestAngularClient} from './rest-angular-client';
import {PathParserFactory, StandardPathParserFactory} from './http/path-parser/path-parser-factory';
import {DefaultMetadata} from './metadata/default-metadata';
import {map, takeLast} from 'rxjs/operators';
import {RestEndpoint} from './types/rest-endpoint';
import {DefaultOptions} from './types/rest-default-options';
import {Injection} from './types/injection';
import {QueryParserFactory, StandardQueryParserFactory} from './http/query-parser/query-parser-factory';

export const REST_BASE_URL = new InjectionToken<string>('Base url');
export const BASE_URL_META = 'base-url';
export const HEADERS_META = 'headers';

const PARAMETERS_PARSER_FACTORIES: Injection<ParameterParserFactory<any>>[] = [
  {
    token: BodyParserFactory,
    default: StandardBodyParserFactory
  },
  {
    token: PathParserFactory,
    default: StandardPathParserFactory
  },
  {
    token: QueryParserFactory,
    default: StandardQueryParserFactory
  }
];

/**
 * Define an api where decorators can be used,
 * it handle injection, and httpClient TODO: move httpClient handling?
 */
export abstract class RestAngularApi {
  client: RestAngularClient;

  constructor(
    @Inject(HttpClient)
    public readonly httpClient: HttpClient,
    @Inject(Injector)
    private readonly injector: Injector,
  ) {
    this.client = new RestAngularClient(
      this.getParameterParserFactories(),
      this.getEndpointsMetadata(),
      this.getDefaultOptions()
    );
  }

  public makeRequest<T>(methodKey: string, parameterValues: any[]): Observable<T> {
    const httpRequest = this.client.buildRequest(methodKey, parameterValues);
    return this.httpClient.request<T>(httpRequest).pipe(
      takeLast(1),
      map((response: HttpResponse<T>) => response.body)
    );
  }

  private getParameterParserFactories(): ParameterParserFactory<any>[] {
    return PARAMETERS_PARSER_FACTORIES.map(injection => {
      return this.getParameterParserFactory(injection);
    });
  }

  private getParameterParserFactory<T>(injection: Injection<ParameterParserFactory<T>>): ParameterParserFactory<T> {
    return this.injector.get(injection.token, new injection.default());
  }

  private getEndpointsMetadata(): Record<string, RestEndpoint> {
    return new EndpointMetadata(
      new MetadataTarget(this)
    ).getAll();
  }

  private getDefaultOptions(): DefaultOptions {
    return new DefaultMetadata(
      new MetadataTarget(this)
    ).get();
  }
}
