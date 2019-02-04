import {BodyParser, StandardBodyParser} from '../body-parser/body-parser';
import {RestAngularClient} from '../../rest-angular-client';
import {HttpClient} from '@angular/common/http';
import {HandleRestMethodFunction} from '../../factories/method-decorator-factory';

export class RestCallHandler {
  constructor(
    private readonly path: string,
    private readonly handleCall: HandleRestMethodFunction,
    private readonly key: string
  ) {
  }

  public makeRequest(args: string[], client: RestAngularClient) {
    const parsedUrl = this.getParsedUrlOfMethod(args, client);
    const body = this.getParsedBodyOfMethod(args, client);

    return this.handleCall(client.httpClient, parsedUrl, body);
  }

  public getParsedUrlOfMethod(args: any[], client: RestAngularClient): string {
    const pathParamParser = client.pathParserMap[this.key];
    const pathWithParams = pathParamParser.parse(args);

    return `${client.baseUrl}/${pathWithParams}`;
  }

  public getParsedBodyOfMethod(args: any[], client: RestAngularClient): string {
    return client.bodyParserMap[this.key].getBodyFromArgs(args);
  }
}
