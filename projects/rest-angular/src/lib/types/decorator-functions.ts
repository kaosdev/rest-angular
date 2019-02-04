import {RestAngularClient, RestEndpoint} from '../rest-angular-client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constructor} from './constructor';

export type RestMethodDecorator = (
  target: RestAngularClient,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void | PropertyDescriptor;

export type RestParameterDecorator = (
  target: RestAngularClient,
  propertyKey: string,
  index: number
) => void;

export type RestClientDecorator = (
  ctor: Constructor<RestAngularClient>
) => void;

export type HandleRestMethodFunction = (httpClient: HttpClient, parsedUrl: string, body?: any) => Observable<any>;
export type HandleRestParameterFunction = (endpoint: RestEndpoint, index: number) => RestEndpoint;
export type HandleRestClientFunction<T> = (metadataValue: T) => T;
