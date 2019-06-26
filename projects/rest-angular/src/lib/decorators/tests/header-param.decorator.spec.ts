import {Injectable} from '@angular/core';
import {BaseUrl, DefaultHeaders} from '../client.decorators';
import {RestAngularApi} from '../../rest-angular-api';
import {EndpointHeaders, GET} from '../method.decorators';
import {HeaderParam} from '../parameter.decorators';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';


describe('@HeaderParam decorator', () => {

  @Injectable()
  @BaseUrl('base_url')
  @DefaultHeaders({
    Authorization: 'basic'
  })
  class TestHeaderParamDecoratorService extends RestAngularApi {
    @GET('examples')
    public testHeaders(@HeaderParam('Authorization') token: string): Observable<any> {
      return null;
    }

    @GET('examples')
    @EndpointHeaders({
      Authorization: 'basic'
    })
    public testHeadersMerge(@HeaderParam('Authorization') token: string): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestHeaderParamDecoratorService);

  it('should make a get with a header param', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.testHeaders('Bearer token').subscribe();

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.headers.get('Authorization')).toBe('Bearer token');
    mockRequest.flush(mockResponse);
  });

  it('should overwrite endpoint headers', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.testHeadersMerge('Bearer token').subscribe();

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.headers.get('Authorization')).toBe('Bearer token');
    mockRequest.flush(mockResponse);
  });

  it('should not overwrite endpoint headers', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.testHeadersMerge(null).subscribe();

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.headers.get('Authorization')).toBe('basic');
    mockRequest.flush(mockResponse);
  });

});
