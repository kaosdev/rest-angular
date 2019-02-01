import {RestMethodDecoratorFactory} from '../factories/decorator-factory';

const methodDecoratorFactory = new RestMethodDecoratorFactory();

export const POST = (path: string) => methodDecoratorFactory.makeDecorator(path, (http, url, body) => {
  return http.post(url, body);
});
