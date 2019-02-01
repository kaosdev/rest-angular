import { PathParamNotFoundError } from './path-parser-errors';
import * as _ from 'lodash';
import {StandardPathParameterParser} from './standard-path-parser';
import {CurlyPathParameterParser} from './curly-path-parser';

function getLongPathWithArguments(argumentCount: number, prefix = ':', suffix = ''): string {
    return _.range(argumentCount).map(i => `path/${prefix}arg${i}${suffix}`).join('/');
}

function getLongPathArgumentNames(argumentCount: number): string[] {
    return _.range(argumentCount).map(i => `arg${i}`);
}

describe('StandardPathParameterParser', () => {
    it('should parse a path with an argument', () => {
        const path = 'path/:arg';
        const names = ['arg'];

        const pathParser = new StandardPathParameterParser(path, names);

        expect(
            pathParser.parse(['value'])
        ).toBe('path/value');
    });

    it('should parse a path with 3 arguments', () => {
        const longPaht = getLongPathWithArguments(3);
        const names = getLongPathArgumentNames(3);

        const pathParser = new StandardPathParameterParser(longPaht, names);

        expect(
            pathParser.parse(['value0', 'value1', 'value2'])
        ).toBe('path/value0/path/value1/path/value2');
    });

    it('should throw PathParamNotFoundError', () => {
        const pathParser = new CurlyPathParameterParser('path/arg', ['arg']);

        expect(() => {
            pathParser.parse(['value']);
        }).toThrowError(`Path parameter 'arg' was not found in the path 'path/arg'`);
    });

    it('should not parse a path without arguments', () => {
        const pathParser = new StandardPathParameterParser('path/arg', []);

        const parsedPath = pathParser.parse([]);

        expect(parsedPath).toBe('path/arg');
    });

    it('should not parse a path with null arguments', () => {
        const pathParser = new StandardPathParameterParser('path/arg', null);

        const parsedPath = pathParser.parse([]);

        expect(parsedPath).toBe('path/arg');
    });
});

describe('CurlyPathParameterParser', () => {
    it('should parse a path with an argument', () => {
        const path = 'path/{arg}';
        const names = ['arg'];

        const pathParser = new CurlyPathParameterParser(path, names);

        expect(
            pathParser.parse(['value'])
        ).toBe('path/value');
    });

    it('should parse a path with 3 arguments', () => {
        const longPaht = getLongPathWithArguments(3, '{', '}');
        const names = getLongPathArgumentNames(3);

        const pathParser = new CurlyPathParameterParser(longPaht, names);

        expect(
            pathParser.parse(['value0', 'value1', 'value2'])
        ).toBe('path/value0/path/value1/path/value2');
    });

    it('should throw PathParamNotFoundError', () => {
        const pathParser = new CurlyPathParameterParser('path/arg', ['arg']);

        expect(() => {
            pathParser.parse(['value']);
        }).toThrowError(`Path parameter 'arg' was not found in the path 'path/arg'`);
    });

    it('should not parse a path without arguments', () => {
        const pathParser = new CurlyPathParameterParser('path/arg', []);

        const parsedPath = pathParser.parse([]);

        expect(parsedPath).toBe('path/arg');
    });

    it('should not parse a path with null arguments', () => {
        const pathParser = new CurlyPathParameterParser('path/arg', null);

        const parsedPath = pathParser.parse([]);

        expect(parsedPath).toBe('path/arg');
    });
});
