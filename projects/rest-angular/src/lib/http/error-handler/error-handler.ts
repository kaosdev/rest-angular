import {Observable} from 'rxjs';

export interface RestOnError {
  onError(error: any): Observable<any>;
}
