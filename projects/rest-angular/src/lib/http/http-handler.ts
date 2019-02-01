import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type HandleRestMethodFunction = (httpClient: HttpClient, parsedUrl: string, body?: any) => Observable<any>;

export class HttpHandler {
    public static getBodyFromArgs(bodyParamIndex: number, args: any[]) {
        return args[bodyParamIndex];
    }
}
