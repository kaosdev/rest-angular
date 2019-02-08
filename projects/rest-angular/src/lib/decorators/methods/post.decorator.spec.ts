import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from '../decorators-utils.spec';

import {BaseUrl} from '..';
import {POST} from './post.decorator';
import {RestAngularClient} from '../../rest-angular-client';

describe('POST Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestPostDecoratorService extends RestAngularClient {

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
