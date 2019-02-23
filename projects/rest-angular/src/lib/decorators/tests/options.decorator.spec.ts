import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

import {RestAngularApi} from '../../rest-angular-api';
import {BaseUrl, OPTIONS, Path} from '..';

describe('@OPTIONS Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestOptionsDecoratorService extends RestAngularApi {

    @OPTIONS(':id')
    public testExample(@Path('id') id: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestOptionsDecoratorService);

  it('should make a OPTIONS', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.testExample(21).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/21');
    expect(mockRequest.request.method).toBe('OPTIONS');
    mockRequest.flush(mockResponse);
  });
});
