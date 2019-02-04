import {PathParameterParser} from './path-parser';
import {StandardPathParameterParser} from './standard-path-parser';
import {CurlyPathParameterParser} from './curly-path-parser';
import {Injectable} from '@angular/core';

export abstract class PathParserFactory {
  abstract makeParser(
    templatePath: string,
    parametersNames: string[]
  ): PathParameterParser;
}

@Injectable()
export class StandardPathParserFactory implements PathParserFactory {
  makeParser(templatePath: string, parametersNames: string[]): PathParameterParser {
    return new StandardPathParameterParser(templatePath, parametersNames);
  }
}

@Injectable()
export class CurlyPathParserFactory implements PathParserFactory {
  makeParser(templatePath: string, parametersNames: string[]): PathParameterParser {
    return new CurlyPathParameterParser(templatePath, parametersNames);
  }
}
