import { RestAngularClient } from './base-url-decorator';
import 'reflect-metadata';
import { RestMethodDecoratorFactory, PATH_PARAM_MAP_META, BODY_PARAM_INDEX_META } from '../factories/decorator-factory';

const methodDecoratorFactory = new RestMethodDecoratorFactory();

export const GET = (path: string) => methodDecoratorFactory.makeDecorator(path, (http, url) => {
    return http.get(url);
});

export const POST = (path: string) => methodDecoratorFactory.makeDecorator(path, (http, url, body) => {
    return http.post(url, body);
});

export function Path(name: string) {
    return function (target: RestAngularClient, propertyKey: string, propertyIndex: number) {
        const pathParams: string[] = Reflect.getMetadata(PATH_PARAM_MAP_META, target) || [];

        pathParams[propertyIndex] = name;

        Reflect.defineMetadata(PATH_PARAM_MAP_META, pathParams, target);
    };
}

export function Body() {
    return function (target: RestAngularClient, propertyKey: string, propertyIndex: number) {
        let bodyParamIndex: any = Reflect.getMetadata(BODY_PARAM_INDEX_META, target);

        if (bodyParamIndex !== undefined) {
            throw new Error(`Only one '@Body()' decorator for each method is supported`);
        }

        bodyParamIndex = propertyIndex;

        Reflect.defineMetadata(BODY_PARAM_INDEX_META, bodyParamIndex, target);
    };
}
