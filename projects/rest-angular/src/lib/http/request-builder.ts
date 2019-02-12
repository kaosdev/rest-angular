import {RestEndpoint} from '../types/rest-endpoint';
import {ParameterParser} from '../types/parameter-parser';
import {HttpRequest} from '@angular/common/http';
import {RestRequest} from '../types/rest-request';

export class RequestBuilder {
  constructor(
    private readonly endpoint: RestEndpoint,
    private readonly parameterParsers: ParameterParser<any>[]
  ) {
  }

  public buildRequest(parameterValues: any[]): HttpRequest<any> {
    const partialRequest = this.getPartialRequest(parameterValues);

    return new HttpRequest(this.endpoint.methodName, partialRequest.url, partialRequest.body, {
      params: partialRequest.query,
    });
  }

  private getPartialRequest(parameterValues: any[]) {
    const request: Partial<RestRequest> = {};

    this.parameterParsers.forEach((parser) => {
      request[parser.REQUEST_FIELD] = parser.parse(parameterValues);
    });

    return request;
  }
}
