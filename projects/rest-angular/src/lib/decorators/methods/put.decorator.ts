import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const PUT = (path: string) => new MethodDecoratorFactory().makeDecorator('PUT', path, (http, request) => {
  return http.put(
    request.url,
    request.body
  );
});
