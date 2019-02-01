import {RestMethodDecorator} from '../types/decorator-functions';
import {HandleRestMethodFunction, HttpHandler} from '../http/http-handler';
import {HttpClient} from '@angular/common/http';
import {StandardPathParameterParser} from '../http/path-parser/standard-path-parser';
import {RestAngularClient} from '../rest-angular-client';

export const PATH_PARAM_MAP_META = 'path-param-map';
export const BODY_PARAM_INDEX_META = 'body-param-index';

export interface RestDecoratorFactory<ParamType, DecoratorType extends Function> {
  makeDecorator(param: ParamType, handleCall: Function): DecoratorType;
}

export class RestMethodDecoratorFactory implements RestDecoratorFactory<string, RestMethodDecorator> {
  public makeDecorator(path: string, handleCall: HandleRestMethodFunction): RestMethodDecorator {
    return (target, key, descriptor) => {
      descriptor.value = this.getRestMethodCallHandler(path, handleCall, key);
    };
  }

  private getRestMethodCallHandler(path: string, handleCall: HandleRestMethodFunction, key: string) {
    const restCallHandler = new RestCallHandler(path, handleCall, key);

    return function (...args: any[]) {
      const restClient = this;
      return restCallHandler.makeRequest(args, restClient);
    };
  }
}

// TODO: move RestCallHandler in a file
class RestCallHandler {
  constructor(
    private readonly path: string,
    private readonly handleCall: HandleRestMethodFunction,
    private readonly key: string
  ) {}

  public makeRequest(args: string[], client: RestAngularClient) {
    const httpClient: HttpClient = client.httpClient;
    const baseUrl: string = client.baseUrl();

    const pathParams: string[] = client.getPathParams(this.key);
    const bodyParamIndex: any = client.getBodyParam(this.key);

    const pathParamsParser = new StandardPathParameterParser(this.path, pathParams);

    const pathWithParams = pathParamsParser.parse(args);
    const parsedUrl = `${baseUrl}/${pathWithParams}`;

    const body = HttpHandler.getBodyFromArgs(bodyParamIndex, args);

    return this.handleCall(httpClient, parsedUrl, body);
  }
}
