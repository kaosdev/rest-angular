import {MetadataTarget} from '../../metadata/metadata-target';
import {Constructor} from '../../types/constructor';
import {RestAngularApi} from '../../rest-angular-api';

export type RestClientDecorator = (
  ctor: Constructor<RestAngularApi>
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

