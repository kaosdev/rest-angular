import {Injectable} from '@angular/core';
import {BodyParser, StandardBodyParser} from './body-parser';
import {ParameterParserFactory} from '../../types/parameter-parser';
import {RestEndpoint} from '../../types/rest-endpoint';

export abstract class BodyParserFactory implements ParameterParserFactory<any> {
  abstract makeParser(
    endpoint: RestEndpoint
  ): BodyParser;
}

@Injectable()
export class StandardBodyParserFactory implements BodyParserFactory {
  makeParser(endpoint) {
    return new StandardBodyParser(endpoint);
  }
}
