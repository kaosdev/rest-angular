import {BASE_URL_META, RestAngularClient} from '../../rest-angular-client';
import {Constructor} from '../../types/constructor';
import {MetadataTarget} from '../../utils/metadata-target';
import {ClientDecoratorFactory} from '../../factories/client-decorator-factory';

export const BaseUrl = (baseUrl: string) => ClientDecoratorFactory.makeDecorator(BASE_URL_META, metadataValue => {
  if (metadataValue) {
    // TODO : Refactor errors, create a new folder
    throw new Error(`Only one '@BaseUrl()' decorator for each client is supported`);
  }

  return baseUrl;
});
