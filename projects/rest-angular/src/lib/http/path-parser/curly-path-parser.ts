import {PathParameterParserImpl} from './path-parser';

// TODO: Test CurlyPathParameterParser
export class CurlyPathParameterParser extends PathParameterParserImpl {
  protected getParameterTemplate(paramName: string): string {
    return `{${paramName}}`;
  }
}
