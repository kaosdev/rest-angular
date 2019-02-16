import {Injectable} from '@angular/core';
import {RestAngularApi} from '../../rest-angular-api';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';
import {BaseUrl, Body, PUT} from '..';

describe('@PUT Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestPutDecoratorService extends RestAngularApi {

    @PUT('examples')
    public updateExamples(@Body body: any): Observable<any> {
      return null;
    }

    @PUT('')
    public updateRoot(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestPutDecoratorService);

  it('should make a PUT', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.updateExamples('body').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('PUT');
    expect(mockRequest.request.body).toBe('body');
    mockRequest.flush(mockResponse);
  });

  it('should make a PUT to base url', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.updateRoot().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url');
    expect(mockRequest.request.method).toBe('PUT');
    mockRequest.flush(mockResponse);
  });
});
