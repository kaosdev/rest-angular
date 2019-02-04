import {BASE_URL_META} from '../../rest-angular-client';
import {ClientDecoratorFactory} from '../../factories/client-decorator-factory';
import {MultipleDecoratorsError} from '../../errors/multiple-decorators-error';

export const BaseUrl = (baseUrl: string) => ClientDecoratorFactory.makeDecorator(BASE_URL_META, metadataValue => {
  if (metadataValue) {
    throw new MultipleDecoratorsError('BaseUrl', 'client');
  }

  return baseUrl;
});
