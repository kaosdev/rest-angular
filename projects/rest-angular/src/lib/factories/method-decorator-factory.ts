import {RestRequest} from '../http/rest-call-handler/rest-call-handler';
import {EndpointMetadata} from '../utils/endpoint-metadata';
import {MetadataTarget} from '../utils/metadata-target';
import {RestAngularClient} from '../rest-angular-client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MultipleDecoratorsError} from '../errors/multiple-decorators-error';

export type RestMethodDecorator = (
  target: RestAngularClient,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void | PropertyDescriptor;

export type HandleRestMethodFunction = (httpClient: HttpClient, request: RestRequest) => Observable<any>;

export class MethodDecoratorFactory {
  public static makeDecorator(name: string, path: string, handleCall: HandleRestMethodFunction): RestMethodDecorator {
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
        endpointMap.handleCall = handleCall;
        return endpointMap;
      });

      descriptor.value = MethodDecoratorFactory.getRestMethodCallHandler(key);
    };
  }

  private static getRestMethodCallHandler(key: string) {
    return function (...args: any[]) {
      return (this as RestAngularClient).makeRequest(key, args);
    };
  }
}
