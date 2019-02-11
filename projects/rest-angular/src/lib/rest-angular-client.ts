import {HttpRequest} from '@angular/common/http';
import {ParameterParser, ParameterParserFactory} from './types/parameter-parser';
import {DefaultOptions} from './types/rest-default-options';
import {RestEndpoint} from './types/rest-endpoint';
import {RequestBuilder} from './request-builder';

export class RestAngularClient {
  private readonly callBuilders: Record<string, RequestBuilder> = {};

  constructor(
    private readonly parameterParserFactories: ParameterParserFactory<any>[],
    private readonly endpointsMetadata: Record<string, RestEndpoint>,
    protected readonly defaultOptions?: DefaultOptions
  ) {
    this.setParsersFromEndpointMap();
  }

  public buildRequest(methodKey: string, parameterValues: any[]): HttpRequest<any> {
    return this.callBuilders[methodKey].buildRequest(parameterValues);
  }

  private setParsersFromEndpointMap() {
    Object.entries(this.endpointsMetadata).forEach(([methodKey, endpoint]) => {
      const mergedEndpoint = this.mergeEndpointWithDefaults(endpoint);
      const parameterParsers = this.getParameterParsers(mergedEndpoint);
      this.callBuilders[methodKey] = new RequestBuilder(mergedEndpoint, parameterParsers);
    });
  }

  private mergeEndpointWithDefaults(endpoint: RestEndpoint): RestEndpoint {
    return {
      ...endpoint,
      ...this.defaultOptions
    };
  }

  private getParameterParsers(endpoint: RestEndpoint): ParameterParser<any>[] {
    return this.parameterParserFactories.map(factory => factory.makeParser(endpoint));
  }
}
