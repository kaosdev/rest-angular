import {RestEndpoint} from './rest-endpoint';

export interface ParameterParserFactory<ReturnType> {
  makeParser(endpoint: RestEndpoint): ParameterParser<ReturnType>;
}

export interface ParameterParser<ReturnType> {
  REQUEST_FIELD: string;
  parse(parameterValues: any[]): ReturnType;
}
