import {QueryParser, StandardQueryParser} from './query-parser';

export abstract class QueryParserFactory {
  abstract makeParser(paramNames: string[]): QueryParser;
}

export class StandardQueryParserFactory extends QueryParserFactory {
  makeParser(paramNames: string[]): QueryParser {
    return new StandardQueryParser(paramNames);
  }
}
