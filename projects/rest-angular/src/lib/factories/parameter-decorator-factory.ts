import {EndpointMetadata} from '../utils/endpoint-metadata';
import {MetadataTarget} from '../utils/metadata-target';
import {RestAngularClient, RestEndpoint} from '../rest-angular-client';

export type RestParameterDecorator = (
  target: RestAngularClient,
  propertyKey: string,
  index: number
) => void;
export type HandleRestParameterFunction = (endpoint: RestEndpoint, index: number) => RestEndpoint;

export class ParameterDecoratorFactory {
  static makeDecorator(endpointMapping: HandleRestParameterFunction): RestParameterDecorator {
    return function (target, propertyKey, index) {
      const endpointMeta = new EndpointMetadata(new MetadataTarget(target));

      endpointMeta.update(propertyKey, endpoint => endpointMapping(endpoint, index));
    };
  }
}
