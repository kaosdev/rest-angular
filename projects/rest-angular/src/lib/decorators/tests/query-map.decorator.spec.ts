import {Injectable} from '@angular/core';
import {BaseUrl} from '../client.decorators';
import {RestAngularClient} from '../../rest-angular-client';
import {GET} from '../method.decorators';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';
import {Path, Query, QueryMap} from '../parameter.decorators';

describe('@QueryMap decorator', () => {

  @Injectable()
  @BaseUrl('base_url')
  class TestQueryMapDecoratorService extends RestAngularClient {

    @GET('examples')
    public getExamples(@QueryMap filters: object): Observable<any> {
      return null;
    }

    @GET('examples/:id')
    public getExample(@Path('id') id: number, @QueryMap filters?: object): Observable<any> {
      return null;
    }

    @GET('examples')
    public getExamplesLimit(@Query('limit') limit: number, @QueryMap otherFilters?: object): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestQueryMapDecoratorService);

  it('should make a get with query params', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamples({
      title: 'example1',
      description: 'example2'
    }).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples?title=example1&description=example2');
    mockRequest.flush(mockResponse);
  });

  it('should make a get without query params', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExample(42).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/42');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with path and query params', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExample(42, {
      title: 'example1',
      description: 'example2'
    }).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/42?title=example1&description=example2');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with a single query params', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamplesLimit(5).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples?limit=5');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with a single query params and a query map', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamplesLimit(5, { title: 'cool', filter: true }).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples?limit=5&title=cool&filter=true');
    mockRequest.flush(mockResponse);
  });
});
