import {MethodDecoratorFactory, RestMethodDecorator} from '../../factories/method-decorator-factory';

export function PATCH(path: string): RestMethodDecorator {
  return new MethodDecoratorFactory().makeDecorator('PATCH', path, (http, request) => {
    return http.patch(
      request.url,
      request.body
    );
  });
}
