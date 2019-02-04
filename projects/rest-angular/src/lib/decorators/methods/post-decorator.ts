import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const POST = (path: string) => MethodDecoratorFactory.makeDecorator(path, (http, url, body) => {
  return http.post(url, body);
});
