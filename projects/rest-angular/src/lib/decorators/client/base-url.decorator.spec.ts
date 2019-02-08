import {Injectable} from '@angular/core';
import {BaseUrl} from './base-url.decorator';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {REST_BASE_URL, RestAngularClient} from '../../rest-angular-client';
import {Body, POST} from '..';
import {Observable} from 'rxjs';


@Injectable()
@BaseUrl('base_url')
export class TestBaseUrlDecoratorService extends RestAngularClient {

}

@Injectable()
export class TestBaseUrlInjectionService extends RestAngularClient {

}

describe('@BaseUrl', () => {
  let testBaseUrlDecoratorService: TestBaseUrlDecoratorService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestBaseUrlDecoratorService,
    ]
  }));

  beforeEach(() => testBaseUrlDecoratorService = TestBed.get(TestBaseUrlDecoratorService));

  it('should set base Url of a RestAngularClient', () => {
    expect(testBaseUrlDecoratorService.baseUrl).toBe('base_url');
  });
});

describe('Base url injection', () => {
  let testBaseUrlInjectionService: TestBaseUrlInjectionService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestBaseUrlInjectionService,
      {provide: REST_BASE_URL, useValue: 'injected_url'}
    ]
  }));

  beforeEach(() => testBaseUrlInjectionService = TestBed.get(TestBaseUrlInjectionService));

  it('should set base Url of a RestAngularClient', () => {
    expect(testBaseUrlInjectionService.baseUrl).toBe('injected_url');
  });
});


describe('Base url not provided', () => {
  it('should throw an error', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          TestBaseUrlInjectionService,
        ]
      });
      TestBed.get(TestBaseUrlInjectionService);
    }).toThrowError('InjectionToken Base url not provided');
  });
});

describe('Multi Base url error', () => {
  it('should throw error when using multiple base url decorators', () => {
    expect(() => {
      @BaseUrl('base_url')
      @BaseUrl('should not be done')
      class TestMultiBaseUrlService extends RestAngularClient {
      }
    }).toThrowError(`Only one '@BaseUrl()' decorator for each client is supported`);
  });
});


