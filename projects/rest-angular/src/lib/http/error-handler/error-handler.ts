import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface RestOnError {
  onError(error: any): Observable<any>;
}

export const REST_ERROR_HANDLER = new InjectionToken<RestOnError>('REST_ERROR_HANDLER');

export function isErrorHandler(handler: any): handler is RestOnError {
  return handler.onError;
}
