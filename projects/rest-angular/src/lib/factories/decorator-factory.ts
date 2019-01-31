import { RestMethodDecorator } from '../types/decorator-functions';
import { HandleRestMethodFunction, HttpHandler } from '../http/http-handler';
import { HttpClient } from '@angular/common/http';
import { StandardPathParameterParser } from '../http/path-parser';

export const PATH_PARAM_MAP_META = 'path-param-map';
export const BODY_PARAM_INDEX_META = 'body-param-index';

export interface RestDecoratorFactory<ParamType, DecoratorType extends Function> {
    makeDecorator(param: ParamType, handleCall: Function): DecoratorType;
}

export class RestMethodDecoratorFactory implements RestDecoratorFactory<string, RestMethodDecorator> {
    public makeDecorator(path: string, handleCall: HandleRestMethodFunction): RestMethodDecorator {
        return (target, key, descriptor) => {
            descriptor.value = this.restMethodFactoryFunction(path, handleCall);
        };
    }

    private restMethodFactoryFunction(path: string, handleCall: HandleRestMethodFunction) {
        return function (...args: any[]) {
            const httpClient: HttpClient = this.httpClient;
            const baseUrl: string = this.baseUrl();

            const pathParams: string[] = Reflect.getMetadata(PATH_PARAM_MAP_META, this);
            const bodyParamIndex: any = Reflect.getMetadata(BODY_PARAM_INDEX_META, this);

            const pathParamsParser = new StandardPathParameterParser(path, pathParams);

            const pathWithParams = pathParamsParser.parseParameters(args);
            const parsedUrl = `${baseUrl}/${pathWithParams}`;

            const body = HttpHandler.getBodyFromArgs(bodyParamIndex, args);

            return handleCall(httpClient, parsedUrl, body);
        };
    }
}
