import {RestMethodDecorator} from '../types/decorator-functions';
import {HandleRestMethodFunction} from '../types/decorator-functions';
import {RestCallHandler} from '../http/rest-call-handler/rest-call-handler';
import {EndpointMetadata} from '../utils/endpoint-metadata';
import {MetadataTarget} from '../utils/metadata-target';

export class MethodDecoratorFactory {
  public static makeDecorator(path: string, handleCall: HandleRestMethodFunction): RestMethodDecorator {
    return (target, key, descriptor) => {
      const endpoint = new EndpointMetadata(new MetadataTarget(target));

      endpoint.update(key, endpointMap => {
        endpointMap.templatePath = path;
        return endpointMap;
      });

      descriptor.value = MethodDecoratorFactory.getRestMethodCallHandler(path, handleCall, key);
    };
  }

  private static getRestMethodCallHandler(path: string, handleCall: HandleRestMethodFunction, key: string) {
    const restCallHandler = new RestCallHandler(path, handleCall, key);

    return function (...args: any[]) {
      return restCallHandler.makeRequest(args, this);
    };
  }
}
