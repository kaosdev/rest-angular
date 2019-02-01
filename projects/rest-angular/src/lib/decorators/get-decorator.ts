import {RestMethodDecoratorFactory} from '../factories/decorator-factory';

const methodDecoratorFactory = new RestMethodDecoratorFactory();

export const GET = (path: string) => methodDecoratorFactory.makeDecorator(path, (http, url) => {
  return http.get(url);
});
