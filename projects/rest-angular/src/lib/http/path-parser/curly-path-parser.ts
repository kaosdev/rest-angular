import {PathParameterParser} from './path-parser';

export class CurlyPathParameterParser extends PathParameterParser {
  protected getParameterTemplate(paramName: string): string {
    return `{${paramName}}`;
  }
}
