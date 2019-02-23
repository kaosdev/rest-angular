import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestAngularApi} from '../../rest-angular-api';
import {getDecoratorProviders} from './decorators-utils.spec';
import {BaseUrl, GET, Path} from '..';
import {Query} from '../parameter.decorators';

describe('@Query decorator', () => {

  @Injectable()
  @BaseUrl('base_url')
  class TestQueryDecoratorService extends RestAngularApi {

    @GET('examples')
    public getExamples(@Query('limit') limit: number, @Query('search') search?: string): Observable<any> {
      return null;
    }

    @GET('examples/:id')
    public getExample(@Path('id') id: number, @Query('lang') languageCode?: string): Observable<any> {
      return null;
    }

    @GET('examples/:id')
    public getPartialExample(@Path('id') id: number, @Query('fields') fields?: string[]): Observable<any> {
      return null;
    }

    /*@GET('examples?id=:id')
    public getExampleById(@Path('id') id: number, @Query('lang') languageCode?: string): Observable<any> {
      return null;
    }*/
  }

  const providers = getDecoratorProviders(TestQueryDecoratorService);

  it('should make a get with a query param', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamples(42).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples?limit=42');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with 2 query param', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExamples(42, 'name').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples?limit=42&search=name');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with a path param', () => {
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

  it('should make a get with a path param and a query param', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExample(42, 'EN').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/42?lang=EN');
    mockRequest.flush(mockResponse);
  });

  it('should make a get with an array query param', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getPartialExample(42, ['title', 'description']).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/42?fields=title,description');
    mockRequest.flush(mockResponse);
  });
});
