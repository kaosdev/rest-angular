import {EndpointMetadata} from '../../metadata/endpoint-metadata';
import {MetadataTarget} from '../../metadata/metadata-target';
import {RestAngularApi} from '../../rest-angular-api';
import {MultipleDecoratorsError} from '../../errors/multiple-decorators-error';

export type RestMethodDecorator = (
  target: RestAngularApi,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void | PropertyDescriptor;

export class MethodDecoratorFactory {
  public makeDecorator(name: string, path: string): RestMethodDecorator {
    return (target, key, descriptor) => {
      const endpoint = new EndpointMetadata(new MetadataTarget(target));

      endpoint.update(key, endpointMap => {
        if (endpointMap.methodName) {
          if (endpointMap.methodName === name) {
            throw new MultipleDecoratorsError(name, 'method');
          } else {
            throw new Error(`Cannot mix decorators in the same method`);
          }
        }

        endpointMap.methodName = name;
        endpointMap.templatePath = path;
        return endpointMap;
      });

      descriptor.value = getRestMethodCallHandler(key);
    };
  }

}

function getRestMethodCallHandler(key: string) {
  return function (...args: any[]) {
    return (this as RestAngularApi).makeRequest(key, args);
  };
}
