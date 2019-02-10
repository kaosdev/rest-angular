import {BASE_URL_META} from '../rest-angular-client';
import {MultipleDecoratorsError} from '../errors/multiple-decorators-error';
import {ClientDecoratorFactory} from '../factories/client-decorator-factory';

const DECORATOR_FACTORY = new ClientDecoratorFactory();

export function BaseUrl(baseUrl: string) {
  const decorator = DECORATOR_FACTORY.makeDecorator(BASE_URL_META, function (metadataValue) {
    if (metadataValue) {
      throw new MultipleDecoratorsError('BaseUrl', 'client');
    }

    return baseUrl;
  });

  return decorator;
}
