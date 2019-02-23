import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {RestAngularApi} from '../../rest-angular-api';
import {getDecoratorProviders} from './decorators-utils.spec';
import {BaseUrl, GET} from '..';


describe('@GET Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestGetDecoratorService extends RestAngularApi {

    @GET('examples')
    public getExamples(): Observable<any> {
      return null;
    }

    @GET('')
    public getRoot(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestGetDecoratorService);

  it('should make a GET', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamples().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  it('should make a GET to base url', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getRoot().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });
});
