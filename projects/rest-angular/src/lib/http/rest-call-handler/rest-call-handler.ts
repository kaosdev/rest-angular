import {PathParameterParser} from '../path-parser/path-parser';
import {BodyParser} from '../body-parser/body-parser';

export class RestCallHandler {
  constructor(
    private readonly baseUrl: string,
    private readonly pathParser: PathParameterParser,
    private readonly bodyParser: BodyParser) {
  }

  public getRequest(args: any[]): RestRequest {
    return {
      url: this.getUrl(args),
      body: this.getBody(args)
    };
  }

  private getUrl(args: any[]): string {
    let url = this.baseUrl;

    const parsedPath = this.pathParser.parse(args);

    if (parsedPath) {
      url += `/${parsedPath}`;
    }

    return url;
  }

  private getBody(args): any {
    return this.bodyParser.getBodyFromArgs(args);
  }
}

export interface RestRequest {
  url: string;
  body: string;
}
