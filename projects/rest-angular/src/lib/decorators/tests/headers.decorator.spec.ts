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
    Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
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
    mockRequest.flush(mockResponse);
  });
});
