import {Injectable} from '@angular/core';
import {BaseUrl, DefaultHeaders} from '../client.decorators';
import {RestAngularApi} from '../../rest-angular-api';
import {GET} from '../method.decorators';
import {Path} from '../parameter.decorators';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

describe('@DefaultHeaders', () => {
  @Injectable()
  @BaseUrl('base_url')
  @DefaultHeaders({
    Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
    'Content-Type': 'application/json'
  })
  class TestHeadersDecoratorService extends RestAngularApi {

    @GET('resource/:id')
    getResource(@Path('id') id: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeadersDecoratorService);

  it('should set base Url of a RestAngularApi', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.get('Authorization')).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
    expect(mockRequest.request.headers.get('Content-Type')).toBe('application/json');
    mockRequest.flush(mockResponse);
  });
});

describe('@DefaultHeaders - no headers', () => {
  @Injectable()
  @BaseUrl('base_url')
  @DefaultHeaders({})
  class TestHeadersDecoratorService extends RestAngularApi {
    @GET('resource/:id')
    getResource(@Path('id') id: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeadersDecoratorService);

  it('should set base Url of a RestAngularApi', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.keys().length).toBe(0);
    mockRequest.flush(mockResponse);
  });
});

describe('@DefaultHeaders - no headers', () => {
  @Injectable()
  @BaseUrl('base_url')
  @DefaultHeaders({
    Cookie: ['cookie one', 'cookie two']
  })
  class TestHeadersDecoratorService extends RestAngularApi {
    @GET('resource/:id')
    getResource(@Path('id') id: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeadersDecoratorService);

  it('should set base Url of a RestAngularApi', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.getAll('Cookie')).toEqual(['cookie one', 'cookie two']);
    mockRequest.flush(mockResponse);
  });
});
