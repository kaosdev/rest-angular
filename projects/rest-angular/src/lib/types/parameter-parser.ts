import {RestEndpoint} from './rest-endpoint';
import {RestRequest} from './rest-request';

export interface ParameterParserFactory<ReturnType> {
  makeParser(endpoint: RestEndpoint): ParameterParser<ReturnType>;
}

export interface ParameterParser<ReturnType> {
  REQUEST_FIELD: keyof RestRequest;
  parse(parameterValues: any[]): ReturnType;
}
