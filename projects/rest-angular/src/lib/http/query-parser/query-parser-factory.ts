import {QueryParser, StandardQueryParser} from './query-parser';
import {Injectable} from '@angular/core';
import {ParameterParserFactory} from '../../types/parameter-parser';
import {HttpParams} from '@angular/common/http';
import {RestEndpoint} from '../../types/rest-endpoint';

export abstract class QueryParserFactory implements  ParameterParserFactory<HttpParams> {
  abstract makeParser(
    endpoint: RestEndpoint
  ): QueryParser;
}

@Injectable()
export class StandardQueryParserFactory extends QueryParserFactory {
  makeParser(endpoint): QueryParser {
    return new StandardQueryParser(endpoint);
  }
}
