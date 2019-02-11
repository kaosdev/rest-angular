import {HttpParams} from '@angular/common/http';

export interface RestRequest {
  url: string;
  body: any;
  queryParams: HttpParams;
}
