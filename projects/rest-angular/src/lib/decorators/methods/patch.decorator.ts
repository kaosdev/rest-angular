import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const PATCH = (path: string) => MethodDecoratorFactory.makeDecorator('PATCH', path, (http, request) => {
    return http.patch(
        request.url,
        request.body
    );
});