import {HttpParams} from '@angular/common/http';

export interface QueryParser {
  parse(args: any[]): HttpParams;
}

export class StandardQueryParser implements QueryParser {
  constructor(
    private paramNames: string[]
  ) {
  }

  parse(args: any[]): HttpParams {
    return new HttpParams({
      fromObject: this.getParamsObject(args)
    });
  }

  private getParamsObject(args: any[]): { [key: string]: any } {
    const queryObject = {};

    if (this.paramNames) {
      this.paramNames.forEach((paramName, index) => {
        const param = args[index];

        if (param) {
          queryObject[paramName] = this.parseParam(param);
        }
      });
    }

    return queryObject;
  }

  private parseParam(param: any): string {
    let parsedParam = String(param);

    if (param instanceof Array) {
      parsedParam = param.join(',');
    }

    return parsedParam;
  }
}
