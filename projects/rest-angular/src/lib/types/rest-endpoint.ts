import {RestHeaders} from './headers';

export interface RestEndpoint {
  methodName: string;
  baseUrl: string;
  headers: RestHeaders;
  templatePath: string;
  pathParameterNames: string[];
  queryParameterNames: string[];
  bodyParamIndex: number;
}
