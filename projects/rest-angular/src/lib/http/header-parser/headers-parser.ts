import {ParameterParser} from '../../types/parameter-parser';
import {HttpHeaders} from '@angular/common/http';
import {RestRequest} from '../../types/rest-request';
import {RestEndpoint} from '../../types/rest-endpoint';

export abstract class HeadersParser implements ParameterParser<HttpHeaders> {
  REQUEST_FIELD: keyof RestRequest = 'headers';
  abstract parse(args: any[]): HttpHeaders;
}

export class StandardHeadersParser extends HeadersParser {
  constructor(
    private endpoint: RestEndpoint
  ) {
    super();
  }

  parse(args: any[]): HttpHeaders {
    return new HttpHeaders(this.endpoint.headers);
  }
}
