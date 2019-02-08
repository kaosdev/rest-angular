import {Injectable} from '@angular/core';
import {BaseUrl, Body, Path, POST} from '..';
import {RestAngularClient} from '../../rest-angular-client';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from '../decorators-utils.spec';
import {DELETE} from './delete.decorator';

describe('@DELETE Decorator', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestGetDecoratorService extends RestAngularClient {

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

describe('@DELETE Decorator - Errors', () => {
  it('should throw error when using multiple DELETE decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @DELETE('path1')
        @DELETE('path2')
        public deleteMultiPath(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@DELETE()' decorator for each method is supported`);
  });

  it('should throw error when using mixed decorators', () => {
    expect(() => {
      @Injectable()
      @BaseUrl('base_url')
      class TestGetDecoratorService extends RestAngularClient {

        @DELETE('path1')
        @POST('path2')
        public deleteOrPost(): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Cannot mix decorators in the same method`);
  });

  @Injectable()
  @BaseUrl('base_url')
  class TestDeleteWithBodyDecoratorService extends RestAngularClient {

    @DELETE('path1')
    public deleteWithBody(@Body body: any): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestDeleteWithBodyDecoratorService);

  it('should throw error when using @Body and @DELETE', () => {
    expect(() => {
      providers.testDecoratorService.deleteWithBody('body').subscribe();
    }).toThrowError(`@Body decorator is not allowed on @DELETE`);
  });
});
