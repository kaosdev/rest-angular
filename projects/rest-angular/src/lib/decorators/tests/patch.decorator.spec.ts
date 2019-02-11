import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';

import {RestAngularApi} from '../../rest-angular-api';
import {BaseUrl, Body, GET, PATCH, Path} from '..';

describe('@PATCH Decorator', () => {
    @Injectable()
    @BaseUrl('base_url')
    class TestPatchDecoratorService extends RestAngularApi {

        @PATCH('examples/:id')
        public patchExample(@Path('id') id: string, @Body obj): Observable<any> {
            return null;
        }
    }

    const providers = getDecoratorProviders(TestPatchDecoratorService);

    it('should make a PATCH', () => {
        const mockResponse = 'response';

        providers.testDecoratorService.patchExample('id', { field: 'new-value' }).subscribe(
            res => {
                expect(res).toBe(mockResponse);
            },
            err => fail(`expected a response, but got error: ${err}`)
        );

        const mockRequest = providers.httpMock.expectOne('base_url/examples/id');
        expect(mockRequest.request.method).toBe('PATCH');
        expect(mockRequest.request.body).toEqual({ field: 'new-value' });
        mockRequest.flush(mockResponse);
    });
});

describe('@PATCH Decorator - Errors', () => {
  it('should throw error when using multiple PUT decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularApi {

        @PATCH('path1')
        @PATCH('path2')
        public updateMultiPath(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@PATCH()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestDecoratorService extends RestAngularApi {

        @PATCH('path1')
        @GET('path2')
        public updateOrGet(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });
});
