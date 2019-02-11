export interface RestEndpoint {
  methodName: string;
  baseUrl: string;
  templatePath: string;
  pathParameterNames: string[];
  queryParameterNames: string[];
  bodyParamIndex: number;
}
