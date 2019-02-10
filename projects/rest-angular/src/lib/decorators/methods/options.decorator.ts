import {MethodDecoratorFactory, RestMethodDecorator} from '../../factories/method-decorator-factory';
import {NotAllowedDecoratorError} from '../../errors/not-allowed-decorator-error';

export function OPTIONS(path: string): RestMethodDecorator {
  return new MethodDecoratorFactory().makeDecorator('OPTIONS', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'OPTIONS');
    }

    return http.options(
      request.url,
      {
        params: request.queryParams
      }
    );
  });
}
