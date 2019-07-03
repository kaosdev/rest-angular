export * from './lib/decorators';

export {
  PathParserFactory,
  CurlyPathParserFactory,
  StandardPathParserFactory
} from './lib/http/path-parser/path-parser-factory';

export {
  RestOnError
} from './lib/http/error-handler/error-handler';

export {
  RestAngularApi,
  REST_BASE_URL,
} from './lib/rest-angular-api';
