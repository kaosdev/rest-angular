import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const POST = (path: string) => new MethodDecoratorFactory().makeDecorator('POST', path, (http, request) => {
  return http.post(
    request.url,
    request.body
  );
});
