import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const OPTIONS = (path: string) => MethodDecoratorFactory.makeDecorator('OPTIONS', path, (http, request) => {
    return http.options(
        request.url
    );
});
