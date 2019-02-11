import {EndpointMetadata} from '../../metadata/endpoint-metadata';
import {MetadataTarget} from '../../metadata/metadata-target';
import {RestAngularApi} from '../../rest-angular-api';
import {RestEndpoint} from '../../types/rest-endpoint';

export type RestParameterDecorator = (
  target: RestAngularApi,
  propertyKey: string,
  index: number
) => void;
export type HandleRestParameterFunction = (endpoint: RestEndpoint, index: number) => RestEndpoint;

export class ParameterDecoratorFactory {
  makeDecorator(endpointMapping: HandleRestParameterFunction): RestParameterDecorator {
    return function (target, propertyKey, index) {
      const endpointMeta = new EndpointMetadata(new MetadataTarget(target));

      endpointMeta.update(propertyKey, endpoint => endpointMapping(endpoint, index));
    };
  }
}
