import {MethodDecoratorFactory, RestMethodDecorator} from '../../factories/method-decorator-factory';

export function POST(path: string): RestMethodDecorator {
  return new MethodDecoratorFactory().makeDecorator('POST', path, (http, request) => {
    return http.post(
      request.url,
      request.body,
      {
        params: request.queryParams
      }
    );
  });
}
