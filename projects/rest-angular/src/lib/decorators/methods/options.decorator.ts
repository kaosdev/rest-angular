import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const OPTIONS = (path: string) => MethodDecoratorFactory.makeDecorator('POST', path, (http, request) => {
    return http.options(
        request.url
    );
});
