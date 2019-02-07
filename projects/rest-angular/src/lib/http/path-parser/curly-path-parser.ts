import {PathParameterParserImpl} from './path-parser';

export class CurlyPathParameterParser extends PathParameterParserImpl {
  protected getParameterTemplate(paramName: string): string {
    return `{${paramName}}`;
  }
}
