import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';
import {NotAllowedDecoratorError} from '../../errors/not-allowed-decorator-error';

export const OPTIONS = (path: string) => new MethodDecoratorFactory().makeDecorator('OPTIONS', path, (http, request) => {
  if (request.body) {
    throw new NotAllowedDecoratorError('Body', 'OPTIONS');
  }

  return http.options(
    request.url
  );
});
