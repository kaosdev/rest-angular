import {Injectable} from '@angular/core';
import {BaseUrl, DefaultHeaders} from '../client.decorators';
import {RestAngularApi} from '../../rest-angular-api';
import {EndpointHeaders, GET, POST} from '../method.decorators';
import {Path} from '../parameter.decorators';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

describe('@EndpointHeaders Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestHeadersDecoratorService extends RestAngularApi {

    @GET('resource/:id')
    @EndpointHeaders({
      Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
      'Content-Type': 'application/html'
    })
    getResource(@Path('id') id: number): Observable<any> {
      return null;
    }

    @POST('resource')
    @EndpointHeaders({
      'Content-Type': 'application/json'
    })
    getResource2(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeadersDecoratorService);

  it('should set base Url of an endpoint', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.get('Authorization')).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
    expect(mockRequest.request.headers.get('Content-Type')).toBe('application/html');
    mockRequest.flush(mockResponse);
  });

  it('should set base Url of another endpoint', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource2().subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource');
    expect(mockRequest.request.headers.get('Content-Type')).toBe('application/json');
    expect(mockRequest.request.headers.get('Authorization')).toBeFalsy();
    mockRequest.flush(mockResponse);
  });
});

describe('@Headers Decorator with @DefaultHeaders', () => {
  @Injectable()
  @BaseUrl('base_url')
  @DefaultHeaders({
    'Content-Type': 'application/json'
  })
  class TestHeadersDecoratorService extends RestAngularApi {

    @GET('resource/:id')
    @EndpointHeaders({
      'Content-Type': 'application/html'
    })
    getResource(@Path('id') id: number): Observable<any> {
      return null;
    }

    @GET('resource/:id')
    @EndpointHeaders({
      Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
    })
    getResource2(@Path('id') id: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeadersDecoratorService);

  it('should have priority', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.get('Content-Type')).toBe('application/html');
    mockRequest.flush(mockResponse);
  });

  it('should merge different headers', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getResource2(42).subscribe();

    const mockRequest = providers.restMock.expectRequest('base_url/resource/42');
    expect(mockRequest.request.headers.get('Content-Type')).toBe('application/json');
    expect(mockRequest.request.headers.get('Authorization')).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
    mockRequest.flush(mockResponse);
  });
});
