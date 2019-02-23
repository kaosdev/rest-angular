import {EndpointMetadata} from '../../metadata/endpoint-metadata';
import {MetadataTarget} from '../../metadata/metadata-target';
import {RestAngularApi} from '../../rest-angular-api';
import {RestEndpoint} from '../../types/rest-endpoint';

export type RestMethodDecorator = (
  target: RestAngularApi,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void | PropertyDescriptor;

function getRestMethodCallHandler(key: string) {
  return function (...args: any[]) {
    return (this as RestAngularApi).makeRequest(key, args);
  };
}

export class MethodDecoratorFactory {
  makeDecorator<T>(mapFn: (endpoint: RestEndpoint) => RestEndpoint) {
    return (target, key, descriptor) => {
      const endpoint = new EndpointMetadata(new MetadataTarget(target));
      endpoint.update(key, mapFn);
    };
  }
}

export class RestMethodDecoratorFactory extends MethodDecoratorFactory {
  makeDecorator<T>(mapFn: (endpoint: RestEndpoint) => RestEndpoint): (target, key, descriptor) => void {
    return (target, key, descriptor) => {
      descriptor.value = getRestMethodCallHandler(key);
      return super.makeDecorator(mapFn)(target, key, descriptor);
    };
  }
}
