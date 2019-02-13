import {ParameterParserFactory} from '../../types/parameter-parser';
import {HttpHeaders} from '@angular/common/http';
import {RestEndpoint} from '../../types/rest-endpoint';
import {Injectable} from '@angular/core';
import {HeadersParser, StandardHeadersParser} from './headers-parser';

export abstract class HeadersParserFactory implements  ParameterParserFactory<HttpHeaders> {
  abstract makeParser(
    endpoint: RestEndpoint
  ): HeadersParser;
}

@Injectable()
export class StandardHeadersParserFactory extends HeadersParserFactory {
  makeParser(endpoint): HeadersParser {
    return new StandardHeadersParser(endpoint);
  }
}
