import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultHeaders, GET, Path, RestAngularApi} from 'rest-angular-decorators';

@Injectable({
  providedIn: 'root'
})
@DefaultHeaders({
  Accept: 'text/html'
})
export class TestGetService extends RestAngularApi {

  @GET('todos/{id}')
  getTodo(
    @Path('id') id: number
  ): Observable<any> {
    return null;
  }

  @GET('todos')
  getTodos(): Observable<any> {
    return null;
  }
}
