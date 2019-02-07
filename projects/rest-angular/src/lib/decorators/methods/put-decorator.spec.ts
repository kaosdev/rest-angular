import {Injectable} from '@angular/core';
import {BaseUrl, Body, GET} from '..';
import {RestAngularClient} from '../../rest-angular-client';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from '../decorators-utils.spec';
import {PUT} from './put-decorator';

describe('PUT Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestGetDecoratorService extends RestAngularClient {

    @PUT('examples')
    public updateExamples(@Body body: any): Observable<any> {
      return null;
    }

    @PUT('')
    public updateRoot(): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestGetDecoratorService);

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

describe('@PUT Decorator - Errors', () => {
  it('should throw error when using multiple PUT decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @PUT('path1')
        @PUT('path2')
        public updateMultiPath(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@PUT()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @PUT('path1')
        @GET('path2')
        public updateOrGet(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });
});
