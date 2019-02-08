import {MetadataTarget} from '../utils/metadata-target';
import {Constructor} from '../types/constructor';
import {RestAngularClient} from '../rest-angular-client';

export type RestClientDecorator = (
  ctor: Constructor<RestAngularClient>
) => void;
export type HandleRestClientFunction<T> = (metadataValue: T) => T;

export class ClientDecoratorFactory {
  makeDecorator<T>(decoratorKey: string, metadataMapping: HandleRestClientFunction<T>): RestClientDecorator {
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

