import {PathParameterParser} from '../path-parser/path-parser';
import {BodyParser} from '../body-parser/body-parser';
import {HttpParams} from '@angular/common/http';
import {QueryParser} from '../query-parser/query-parser';

export class RestCallHandler {
  constructor(
    private readonly pathParser: PathParameterParser,
    private readonly bodyParser: BodyParser,
    private readonly queryParser: QueryParser) {
  }

  public getRequest(args: any[]): RestRequest {
    return {
      url: this.getUrl(args),
      body: this.getBody(args),
      queryParams: this.getQueryParams(args),
    };
  }

  private getUrl(args: any[]): string {
    return this.pathParser.parse(args);
  }

  private getBody(args): any {
    return this.bodyParser.getBodyFromArgs(args);
  }

  private getQueryParams(args): HttpParams {
    return this.queryParser.parse(args);
  }
}

export interface RestRequest {
  url: string;
  body: string;
  queryParams: HttpParams;
}
