import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const GET = (path: string) => MethodDecoratorFactory.makeDecorator(path, (http, url) => {
  return http.get(url);
});
