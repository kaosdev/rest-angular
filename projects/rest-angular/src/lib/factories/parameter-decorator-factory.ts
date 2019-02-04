import {HandleRestParameterFunction, RestParameterDecorator} from '../types/decorator-functions';
import {EndpointMetadata} from '../utils/endpoint-metadata';
import {MetadataTarget} from '../utils/metadata-target';

export class ParameterDecoratorFactory {
  static makeDecorator(endpointMapping: HandleRestParameterFunction): RestParameterDecorator {
    return function (target, propertyKey, index) {
      const endpointMeta = new EndpointMetadata(new MetadataTarget(target));

      endpointMeta.update(propertyKey, endpoint => endpointMapping(endpoint, index));
    };
  }
}
