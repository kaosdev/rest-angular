import {PathParameterParser} from './path-parser';
import {StandardPathParameterParser} from './standard-path-parser';
import {CurlyPathParameterParser} from './curly-path-parser';
import {Injectable} from '@angular/core';
import {ParameterParserFactory} from '../../types/parameter-parser';
import {RestEndpoint} from '../../types/rest-endpoint';

export abstract class PathParserFactory implements ParameterParserFactory<string> {
  abstract makeParser(
    endpoint: RestEndpoint
  ): PathParameterParser;
}

@Injectable()
export class StandardPathParserFactory implements PathParserFactory {
  makeParser(endpoint): PathParameterParser {
    return new StandardPathParameterParser(endpoint);
  }
}

@Injectable()
export class CurlyPathParserFactory implements PathParserFactory {
  makeParser(endpoint): PathParameterParser {
    return new CurlyPathParameterParser(endpoint);
  }
}
