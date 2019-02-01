import {PathParameterParserImpl} from './path-parser';

export class StandardPathParameterParser extends PathParameterParserImpl {
  protected getParameterTemplate(paramName: string): string {
    return `:${paramName}`;
  }
}
