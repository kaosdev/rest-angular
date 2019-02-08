import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from '../decorators-utils.spec';

import {BaseUrl} from '..';
import {POST} from './post.decorator';
import {RestAngularClient} from '../../rest-angular-client';
import {PATCH} from './patch.decorator';

describe('@POST Decorator', () => {
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

describe('@POST Decorator - Errors', () => {
  it('should throw error when using multiple POST decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularClient {

        @POST('path1')
        @POST('path2')
        public updateMultiPath(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@POST()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularClient {

        @POST('path1')
        @PATCH('path2')
        public updateOrGet(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });
});

