import {Injectable} from '@angular/core';
import {BodyParser, StandardBodyParser} from './body-parser';

export abstract class BodyParserFactory {
  abstract makeParser(
    bodyParamIndex: number
  ): BodyParser;
}

@Injectable()
export class StandardBodyParserFactory implements BodyParserFactory {
  makeParser(bodyParamIndex) {
    return new StandardBodyParser(bodyParamIndex);
  }
}
