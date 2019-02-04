import {BASE_URL_META, RestAngularClient} from '../../rest-angular-client';
import {Constructor} from '../../types/constructor';
import {MetadataTarget} from '../../utils/metadata-target';

export function BaseUrl(baseUrl: string) {
  return function <T extends Constructor<RestAngularClient>>(ctor: T) {
    const metadataTarget = new MetadataTarget(ctor.prototype);
    metadataTarget.defineMetadata(BASE_URL_META, baseUrl);

    return ctor;
  };
}

