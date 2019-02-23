import {ParameterParser} from '../../types/parameter-parser';
import {RestEndpoint} from '../../types/rest-endpoint';
import {RestRequest} from '../../types/rest-request';

export abstract class BodyParser implements ParameterParser<any> {
  REQUEST_FIELD: keyof RestRequest = 'body';

  abstract parse(parameterValues: any[]): any;
}

export class StandardBodyParser extends BodyParser {
  constructor(
    private endpoint: RestEndpoint
  ) {
    super();
  }

  parse(parameterValues: any[]): any {
    return parameterValues[this.endpoint.bodyParamIndex];
  }
}
