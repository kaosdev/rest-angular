import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const DELETE = (path: string) => MethodDecoratorFactory.makeDecorator('DELETE', path, (http, request) => {
  return http.delete(
    request.url
  );
});

