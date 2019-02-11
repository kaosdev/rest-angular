import {PathParameterParser} from './path-parser';

export class StandardPathParameterParser extends PathParameterParser {
  protected getParameterTemplate(paramName: string): string {
    return `:${paramName}`;
  }
}
