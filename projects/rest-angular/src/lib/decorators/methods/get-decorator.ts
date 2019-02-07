import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';

export const GET = (path: string) => MethodDecoratorFactory.makeDecorator('GET', path, (http, request) => {
  if (request.body) {
    throw new Error(`@Body decorator is not allowed on @GET`);
  }

  return http.get(request.url);
});
