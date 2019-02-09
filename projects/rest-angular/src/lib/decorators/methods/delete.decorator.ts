import {MethodDecoratorFactory, RestMethodDecorator} from '../../factories/method-decorator-factory';
import {NotAllowedDecoratorError} from '../../errors/not-allowed-decorator-error';

export function DELETE(path: string): RestMethodDecorator {
  return new MethodDecoratorFactory().makeDecorator('DELETE', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'DELETE');
    }

    return http.delete(
      request.url
    );
  });
}
