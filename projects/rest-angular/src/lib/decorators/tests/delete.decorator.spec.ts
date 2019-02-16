import {Injectable} from '@angular/core';
import {RestAngularApi} from '../../rest-angular-api';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';
import {BaseUrl, DELETE, Path} from '..';

describe('@DELETE Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestGetDecoratorService extends RestAngularApi {

    @DELETE('examples/:uuid')
    public deleteExamples(@Path('uuid') uuid: string): Observable<any> {
      return null;
    }

    @DELETE('')
    public deleteRoot(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestGetDecoratorService);

  it('should make a DELETE', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.deleteExamples('uuid-to-delete').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/uuid-to-delete');
    expect(mockRequest.request.method).toBe('DELETE');
    mockRequest.flush(mockResponse);
  });

  it('should make a DELETE to base url', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.deleteRoot().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url');
    expect(mockRequest.request.method).toBe('DELETE');
    mockRequest.flush(mockResponse);
  });
});
