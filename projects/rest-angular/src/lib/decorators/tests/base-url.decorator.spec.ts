import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {REST_BASE_URL, RestAngularApi} from '../../rest-angular-api';
import {BaseUrl} from '../client.decorators';


@Injectable()
@BaseUrl('base_url')
export class TestBaseUrlDecoratorService extends RestAngularApi {

}

@Injectable()
export class TestBaseUrlInjectionService extends RestAngularApi {

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

  it('should set base Url of a RestAngularApi', /*() => {
    expect(testBaseUrlDecoratorService.baseUrl).toBe('base_url');
  }*/);
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

  it('should set base Url of a RestAngularApi', /*() => {
    expect(testBaseUrlInjectionService.baseUrl).toBe('injected_url');
  }*/);
});


xdescribe('Base url not provided', () => {
  it('should throw an error', /*() => {
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
  }*/);
});

xdescribe('Multi Base url error', () => {
  it('should throw error when using multiple base url decorators', () => {
    expect(() => {
      @BaseUrl('base_url')
      @BaseUrl('should not be done')
      class TestMultiBaseUrlService extends RestAngularApi {
      }
    }).toThrowError(`Only one '@BaseUrl()' decorator for each client is supported`);
  });
});


