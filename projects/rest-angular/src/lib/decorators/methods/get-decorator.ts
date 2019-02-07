import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const GET = (path: string) => MethodDecoratorFactory.makeDecorator('GET', path, (http, request) => {
  return http.get(request.url);
});
