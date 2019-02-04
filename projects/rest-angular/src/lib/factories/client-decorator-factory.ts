import {HandleRestClientFunction, RestClientDecorator} from '../types/decorator-functions';
import {MetadataTarget} from '../utils/metadata-target';

export class ClientDecoratorFactory {
  static makeDecorator<T>(decoratorKey: string, metadataMapping: HandleRestClientFunction<T>): RestClientDecorator {
    return function (ctor) {
      const metadataTarget = new MetadataTarget(ctor.prototype);

      metadataTarget.updateMetadata<T>(
        decoratorKey,
        metadata =>
          metadataMapping(metadata)
      );
    };
  }
}

