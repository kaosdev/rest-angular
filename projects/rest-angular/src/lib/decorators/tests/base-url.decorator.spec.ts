import {Injectable} from '@angular/core';
import {REST_BASE_URL, RestAngularApi} from '../../rest-angular-api';
import {BaseUrl} from '../client.decorators';
import {GET} from '../method.decorators';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';


@Injectable()
@BaseUrl('base_url')
export class TestBaseUrlDecoratorService extends RestAngularApi {

  @GET('path')
  testBaseUrl(): Observable<any> {
    return null;
  }
}

@Injectable()
export class TestBaseUrlInjectionService extends RestAngularApi {

  @GET('path')
  testBaseUrl(): Observable<any> {
    return null;
  }
}

describe('@BaseUrl', () => {
  const providers = getDecoratorProviders(TestBaseUrlDecoratorService);

  it('should set base Url of a RestAngularApi', () => {
    providers.testDecoratorService.testBaseUrl().subscribe();

    const mockRequest = providers.httpMock.expectOne('base_url/path');
    mockRequest.flush('response');
  });
});

describe('REST_BASE_URL Injection', () => {
  const providers = getDecoratorProviders(TestBaseUrlInjectionService, [
    { provide: REST_BASE_URL, useValue: 'injected' }
  ]);

  it('should set base Url of a RestAngularApi', () => {
    providers.testDecoratorService.testBaseUrl().subscribe();

    const mockRequest = providers.httpMock.expectOne('injected/path');
    mockRequest.flush('response');
  });
});


describe('Base url not provided', () => {
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

describe('Multi Base url error', () => {
  it('should throw error when using multiple base url decorators', () => {
    expect(() => {
      @BaseUrl('base_url')
      @BaseUrl('should not be done')
      class TestMultiBaseUrlService extends RestAngularApi {
      }
    }).toThrowError(`Only one '@BaseUrl()' decorator for each client is supported`);
  });
});


