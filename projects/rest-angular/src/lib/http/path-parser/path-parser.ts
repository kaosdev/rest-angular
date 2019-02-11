import {PathParamNotFoundError} from './path-parser-errors';

export interface PathParameterParser {
  parse(parameterValues: any[]): string;
}

export abstract class PathParameterParserImpl implements PathParameterParser {

  constructor(
    protected baseUrl: string,
    protected templatePath: string,
    protected parametersNames: string[]
  ) {
  }

  public parse(parameterValues: any[]): string {
    let url = this.baseUrl;
    let parsedPath = this.templatePath;

    if (this.parametersNames) {
      this.parametersNames.forEach((paramName, i) => {
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
      throw new PathParamNotFoundError(paramName, this.templatePath);
    }
  }

  private parseParameter(path: string, paramName: string, parameterValue: any): string {
    return path.replace(this.getParameterTemplate(paramName), parameterValue);
  }

  private templatePathHasParameter(paramName: string): boolean {
    return this.templatePath.includes(
      this.getParameterTemplate(paramName)
    );
  }

  protected abstract getParameterTemplate(paramName: string): string;
}
