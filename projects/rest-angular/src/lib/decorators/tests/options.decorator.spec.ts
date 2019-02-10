import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

import {RestAngularClient} from '../../rest-angular-client';
import {BaseUrl, Body, GET, OPTIONS, Path} from '..';

describe('@OPTIONS Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestOptionsDecoratorService extends RestAngularClient {

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

describe('@OPTIONS Decorator - Errors', () => {
  it('should throw error when using multiple OPTIONS decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularClient {

        @OPTIONS('path1')
        @OPTIONS('path2')
        public options(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@OPTIONS()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularClient {

        @OPTIONS('path1')
        @GET('path2')
        public options(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });

  @Injectable()
  @BaseUrl('base_url')
  class TestOptionsWithBodyDecoratorService extends RestAngularClient {

    @OPTIONS('path1')
    public optionsWithBody(@Body body: any): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestOptionsWithBodyDecoratorService);

  it('should throw error when using @Body and @OPTIONS', () => {
    expect(() => {
      providers.testDecoratorService.optionsWithBody('body').subscribe();
    }).toThrowError(`@Body decorator is not allowed on @OPTIONS`);
  });
});
