import {HttpParams} from '@angular/common/http';
import {ParameterParser} from '../../types/parameter-parser';
import {RestEndpoint} from '../../types/rest-endpoint';
import {RestRequest} from '../../types/rest-request';

export abstract class QueryParser implements ParameterParser<HttpParams> {
  REQUEST_FIELD: keyof RestRequest = 'query';
  abstract parse(args: any[]): HttpParams;
}

export class StandardQueryParser extends QueryParser {
  constructor(
    private endpoint: RestEndpoint
  ) {
    super();
  }

  parse(args: any[]): HttpParams {
    return new HttpParams({
      fromObject: this.getParamsObject(args)
    });
  }

  private getParamsObject(args: any[]): { [key: string]: any } {
    let queryObject = {};

    if (this.endpoint.queryParameterNames) {
      this.endpoint.queryParameterNames.forEach((paramName, index) => {
        const param = args[index];

        if (param) {
          if (paramName) {
            queryObject[paramName] = this.parseParam(param);
          } else {
            queryObject = {...queryObject, ...param};
          }
        }
      });
    }

    return queryObject;
  }

  private parseParam(param: any): any {
    let parsedParam = String(param);

    if (param instanceof Array) {
      parsedParam = param.join(',');
    }

    return parsedParam;
  }
}
