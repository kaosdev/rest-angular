import {MethodDecoratorFactory} from '../../factories/method-decorator-factory';
import {NotAllowedDecoratorError} from '../../errors/not-allowed-decorator-error';

export function GET(path: string) {
  return new MethodDecoratorFactory().makeDecorator('GET', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'GET');
    }

    return http.get(request.url);
  });
}
