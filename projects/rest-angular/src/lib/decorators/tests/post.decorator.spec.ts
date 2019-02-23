import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

import {RestAngularApi} from '../../rest-angular-api';
import {BaseUrl, POST} from '..';

describe('@POST Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestPostDecoratorService extends RestAngularApi {

    @POST('examples')
    public createExample(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestPostDecoratorService);

  it('should make a POST', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.createExample().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toBeNull();
    mockRequest.flush(mockResponse);
  });
});
