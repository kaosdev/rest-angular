import {RestCallHandler} from '../http/rest-call-handler/rest-call-handler';
import {EndpointMetadata} from '../utils/endpoint-metadata';
import {MetadataTarget} from '../utils/metadata-target';
import {RestAngularClient} from '../rest-angular-client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export type RestMethodDecorator = (
  target: RestAngularClient,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void | PropertyDescriptor;
export type HandleRestMethodFunction = (httpClient: HttpClient, parsedUrl: string, body?: any) => Observable<any>;

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
