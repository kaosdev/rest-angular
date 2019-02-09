import {MethodDecoratorFactory, RestMethodDecorator} from '../../factories/method-decorator-factory';

export function PUT(path: string): RestMethodDecorator {
  return new MethodDecoratorFactory().makeDecorator('PUT', path, (http, request) => {
    return http.put(
      request.url,
      request.body
    );
  });
}
