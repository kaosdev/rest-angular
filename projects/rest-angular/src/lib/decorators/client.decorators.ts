import {BASE_URL_META, HEADERS_META} from '../metadata/default-metadata';
import {MultipleDecoratorsError} from '../errors/multiple-decorators-error';
import {ClientDecoratorFactory} from './factories/client-decorator-factory';
import {RestHeaders} from '../types/headers';

/**
 * Use this syntax:
 *
 * function decorator() {
 *    const decorator = ...
 *
 *    return decorator;
 * }
 *
 */

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

export function DefaultHeaders(headers: RestHeaders) {
  const decorator = DECORATOR_FACTORY.makeDecorator<RestHeaders>(HEADERS_META, function (metadataValue) {
    return {...metadataValue, ...headers};
  });

  return decorator;
}
