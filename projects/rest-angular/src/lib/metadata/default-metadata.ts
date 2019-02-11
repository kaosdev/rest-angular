import {MetadataTarget} from './metadata-target';
import {BASE_URL_META} from '../rest-angular-api';
import {DefaultOptions} from '../types/rest-default-options';

// TODO: make a unic metadata for all defaults?
const DEFAULT_OPTIONS_META = 'default-options';

export class DefaultMetadata {
  constructor(
    private target: MetadataTarget,
  ) {
  }

  get(): DefaultOptions {
    return {
      baseUrl: this.target.getMetadata(BASE_URL_META)
    };
  }
}
