import {PathParamNotFoundError} from './path-parser-errors';
import {ParameterParser} from '../../types/parameter-parser';
import {RestEndpoint} from '../../types/rest-endpoint';

export abstract class PathParameterParser implements ParameterParser<any> {
  REQUEST_FIELD = 'url';

  constructor(
    protected endpoint: RestEndpoint,
  ) {
  }

  public parse(parameterValues: any[]): string {
    let url = this.endpoint.baseUrl;
    let parsedPath = this.endpoint.templatePath;

    if (this.endpoint.pathParameterNames) {
      this.endpoint.pathParameterNames.forEach((paramName, i) => {
        parsedPath = this.parseParameterOrThrowError(parsedPath, paramName, parameterValues[i]);
      });
    }

    if (parsedPath) {
      url += `/${parsedPath}`;
    }

    return url;
  }

  private parseParameterOrThrowError(parsedPath: string, paramName: string, parameterValue: string): string {
    if (this.templatePathHasParameter(paramName)) {
      return this.parseParameter(parsedPath, paramName, parameterValue);
    } else {
      throw new PathParamNotFoundError(paramName, this.endpoint.templatePath);
    }
  }

  private parseParameter(path: string, paramName: string, parameterValue: any): string {
    return path.replace(this.getParameterTemplate(paramName), parameterValue);
  }

  private templatePathHasParameter(paramName: string): boolean {
    return this.endpoint.templatePath.includes(
      this.getParameterTemplate(paramName)
    );
  }

  protected abstract getParameterTemplate(paramName: string): string;
}
