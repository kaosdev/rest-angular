
export class PathParamNotFoundError extends Error {
    constructor(
        private paramName: string,
        private path: string
    ) {
        super(`Path parameter '${paramName}' was not found in the path '${path}'`);
    }
}

export abstract class PathParameterParser {
    constructor(
        protected templatePath: string,
        protected parametersNames: string[]
    ) { }

    prefix: string;
    suffix: string;
    protected abstract parseParameter(path: string, paramName: string, parameterValue: any): string;

    parse(parameterValues: any[]): string {
        let parsedPath = this.templatePath;

        if (this.parametersNames) {
            this.parametersNames.forEach((paramName, i) => {
                if (this.templatePathHasParameter(paramName)) {
                    parsedPath = this.parseParameter(parsedPath, paramName, parameterValues[i]);
                } else {
                    throw new PathParamNotFoundError(paramName, this.templatePath);
                }
            });
        }

        return parsedPath;
    }

    private templatePathHasParameter(paramName: string): boolean {
        return this.templatePath.includes(
            this.getParameterTemplate(paramName)
        );
    }

    private getParameterTemplate(paramName: string): string {
        return `${this.prefix}${paramName}${this.suffix}`;
    }
}

export class StandardPathParameterParser extends PathParameterParser {
    prefix = ':';
    suffix = '';

    parseParameter(path: string, paramName: string, parameterValue: any): string {
        return path.replace(`:${paramName}`, parameterValue);
    }
}

export class CurlyPathParameterParser extends PathParameterParser {
    prefix = '{';
    suffix = '}';

    parseParameter(path: string, paramName: string, parameterValue: any): string {
        return path.replace(`{${paramName}}`, parameterValue);
    }
}
