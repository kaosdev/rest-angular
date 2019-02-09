import {Injectable} from '@angular/core';
import {Body, POST, RestAngularClient} from 'rest-angular-decorators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestPostServiceService extends RestAngularClient {

  @POST('posts')
  public createPost(@Body postObj: Post): Observable<Post> {
    return null;
  }
}

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}
