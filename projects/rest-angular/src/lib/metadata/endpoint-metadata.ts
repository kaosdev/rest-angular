import {MetadataTarget} from './metadata-target';
import {RestEndpoint} from '../types/rest-endpoint';

const ENDPOINT_MAP_META = 'endpoint-map';

export class EndpointMetadata {
  constructor(
    private target: MetadataTarget,
  ) {
  }

  getAll(): Record<string, RestEndpoint> {
    return this.target.getMetadata(ENDPOINT_MAP_META) || {};
  }

  define(methodKey: string, endpoint: RestEndpoint): void {
    const endpointMap = this.getAll();
    endpointMap[methodKey] = endpoint;
    this.target.defineMetadata(ENDPOINT_MAP_META, endpointMap);
  }

  get(methodKey: string): RestEndpoint {
    const endpointMap = this.getAll();
    if (endpointMap[methodKey]) {
      return endpointMap[methodKey];
    } else {
      return {} as RestEndpoint;
    }
  }

  update(methodKey: string, mapFn: (endpoint: RestEndpoint) => RestEndpoint): void {
    const endpoint = this.get(methodKey);
    this.define(methodKey, mapFn(endpoint));
  }
}
