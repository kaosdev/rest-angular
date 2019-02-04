import {Injectable} from '@angular/core';
import {RestAngularClient, POST} from 'rest-angular';
import {Observable} from 'rxjs';
import {Body} from '../../../../rest-angular/src/lib/decorators';

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
