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
import {catchError, map, takeLast} from 'rxjs/operators';
import {RestEndpoint} from './types/rest-endpoint';
import {DefaultOptions} from './types/rest-default-options';
import {Injection} from './types/injection';
import {QueryParserFactory, StandardQueryParserFactory} from './http/query-parser/query-parser-factory';
import {HeadersParserFactory, StandardHeadersParserFactory} from './http/header-parser/headers-parser-factory';
import {isErrorHandler, REST_ERROR_HANDLER, RestOnError} from './http/error-handler/error-handler';

export const REST_BASE_URL = new InjectionToken<string>('Base url');

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
  },
  {
    token: HeadersParserFactory,
    default: StandardHeadersParserFactory
  }
];

/**
 * Define an api where decorators can be used,
 * it handle injection, and httpClient TODO: move httpClient handling?
 */
export abstract class RestAngularApi {
  client: RestAngularClient;
  errorHandler: RestOnError;

  constructor(
    @Inject(HttpClient)
    public readonly httpClient: HttpClient,
    @Inject(Injector)
    private readonly injector: Injector,
  ) {
    this.errorHandler = this.getErrorHandler();
    this.client = new RestAngularClient(
      this.getParameterParserFactories(),
      this.getEndpointsMetadata(),
      this.getMergedOptions()
    );
  }

  private getErrorHandler(): RestOnError {
    if (isErrorHandler(this)) {
      return this;
    }

    return this.injector.get(REST_ERROR_HANDLER, null);
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

  private getMergedOptions(): DefaultOptions {
    return {
      ...this.getInjectedOptions(),
      ...this.getDefaultOptions(),
    };
  }

  private getDefaultOptions(): DefaultOptions {
    return new DefaultMetadata(
      new MetadataTarget(this)
    ).get();
  }

  private getInjectedOptions(): DefaultOptions {
    const baseUrl = this.injector.get(REST_BASE_URL, null);

    return {
      ...(baseUrl ? {
        baseUrl
      } : {})
    } as DefaultOptions;
  }

  public makeRequest<T>(methodKey: string, parameterValues: any[]): Observable<T> {
    const httpRequest = this.client.buildRequest(methodKey, parameterValues);

    const mappedRequest = this.httpClient.request<T>(httpRequest).pipe(
      takeLast(1),
      map((response: HttpResponse<T>) => response.body),
    );

    return this.errorHandler ? mappedRequest.pipe(
      catchError(err => this.errorHandler.onError(err))
    ) : mappedRequest;
  }
}
