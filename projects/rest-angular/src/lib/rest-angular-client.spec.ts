import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {REST_BASE_URL, RestAngularClient} from './rest-angular-client';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurlyPathParserFactory, PathParserFactory} from './http/path-parser/path-parser-factory';
import {GET, Path} from './decorators';
import {CurlyPathParameterParser} from './http/path-parser/curly-path-parser';
import {StandardPathParameterParser} from './http/path-parser/standard-path-parser';

describe('RestAnularClient', () => {
  @Injectable()
  class TestRestAngularClientInjection extends RestAngularClient {
    @GET('path/:id')
    testStandardParser(@Path('id') id: number) {
      return null;
    }

    @GET('path/{id}')
    testCurlyParser(@Path('id') id: number) {
      return null;
    }
  }

  describe('should inject', () => {

    let testClient: TestRestAngularClientInjection;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: REST_BASE_URL, useValue: 'http://localhost:3000'},
          {provide: PathParserFactory, useClass: CurlyPathParserFactory},
          TestRestAngularClientInjection
        ]
      });
    });

    beforeEach(() => {
      testClient = TestBed.get(TestRestAngularClientInjection);
    });

    it('should inject HttpClient', () => {
      expect(testClient.httpClient).toEqual(jasmine.any(HttpClient));
    });

    it('should inject REST_BASE_URL', () => {
      expect(testClient.baseUrl).toEqual('http://localhost:3000');
    });

    it('should inject PathParserFactory', () => {
      const pathParser = testClient.pathParserMap['testCurlyParser'];

      expect(pathParser).toEqual(jasmine.any(CurlyPathParameterParser));
    });
  });

  describe('should not inject', () => {
    let testClient: TestRestAngularClientInjection;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          TestRestAngularClientInjection,
          {provide: REST_BASE_URL, useValue: 'http://localhost:3000'},
        ]
      });
    });

    beforeEach(() => {
      testClient = TestBed.get(TestRestAngularClientInjection);
    });

    it('should take standard Parser', () => {
      const pathParser = testClient.pathParserMap['testStandardParser'];

      expect(pathParser).toEqual(jasmine.any(StandardPathParameterParser));
    });
  });
});
