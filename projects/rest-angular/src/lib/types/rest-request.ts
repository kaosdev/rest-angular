import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface RestRequest {
  url: string;
  body: any;
  query: HttpParams;
  headers: HttpHeaders;
}
