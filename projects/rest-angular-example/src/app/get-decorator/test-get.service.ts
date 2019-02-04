import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestAngularClient, GET, Path} from 'rest-angular';

@Injectable({
  providedIn: 'root'
})
export class TestGetService extends RestAngularClient {

  @GET('todos')
  getTodos(): Observable<any[]> {
    return null;
  }

  @GET('todos/{id}')
  getTodo(
    @Path('id') id: number
  ): Observable<any> {
    return null;
  }

  @GET('todos/{id2}')
  getTodo2(
    @Path('id2') id: number
  ): Observable<any> {
    return null;
  }
}
