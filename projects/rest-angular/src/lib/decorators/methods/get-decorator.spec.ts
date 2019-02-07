import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseUrl, Body, POST} from '../';
import {GET} from './get-decorator';
import {RestAngularClient} from '../../rest-angular-client';
import {getDecoratorProviders} from '../decorators-utils.spec';


describe('GET Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestGetDecoratorService extends RestAngularClient {

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

describe('@GET Decorator - Errors', () => {
  it('should throw error when using multiple GET decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @GET('path1')
        @GET('path2')
        public getMultiPath(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@GET()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @GET('path1')
        @POST('path2')
        public getOrPost(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });
});
