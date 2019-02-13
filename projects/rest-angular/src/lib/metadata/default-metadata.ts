import {MetadataTarget} from './metadata-target';
import {DefaultOptions} from '../types/rest-default-options';

// TODO: make a unic metadata for all defaults?
const DEFAULT_OPTIONS_META = 'default-options';

export const BASE_URL_META = 'base-url';
export const HEADERS_META = 'headers';

export class DefaultMetadata {
  constructor(
    private target: MetadataTarget,
  ) {
  }

  get(): DefaultOptions {
    const baseUrl = this.target.getMetadata(BASE_URL_META);
    const headers = this.target.getMetadata(HEADERS_META);

    return {
      ...(baseUrl ? {
        baseUrl
      } : {}),
      ...(headers ? {
        headers
      } : {})
    } as DefaultOptions;
  }
}
