import {Injectable} from '@angular/core';
import {BaseUrl} from '..';
import {GET} from '..';
import {Path} from './path.decorator';
import {Observable} from 'rxjs';
import {RestAngularClient} from '../../rest-angular-client';
import {CurlyPathParserFactory, PathParserFactory} from '../../http/path-parser/path-parser-factory';
import {getDecoratorProviders} from '../decorators-utils.spec';

describe('Path decorator parameters parsing', () => {

  @Injectable()
  @BaseUrl('base_url')
  class TestPathDecoratorService extends RestAngularClient {

    @GET('examples/:id/:param')
    public getExampleByIdAndParam(@Path('id') id: number, @Path('param') param: string): Observable<any> {
      return null;
    }

    @GET('examples/:param/:id')
    public getExampleByIdAndParamInvert(@Path('id') id: number, @Path('param') param: string): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestPathDecoratorService);

  it('should parse parameters', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExampleByIdAndParam(1, 'attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/1/attr');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  it('should parse inverted parameters', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExampleByIdAndParamInvert(1, 'attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/attr/1');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });
});


describe('Path decorator parameter not found', () => {

  @Injectable()
  @BaseUrl('base_url')
  class TestPathDecoratorService extends RestAngularClient {

    @GET('examples/:id?param=:param')
    public getWithRightPathNames(@Path('param') param: string, @Path('id') id: number): Observable<any> {
      return null;
    }

    @GET('examples/:id')
    public getThatThrowError(@Path('wrong-name') wrongId: number): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestPathDecoratorService);

  it('should not throw PathParamNotFoundError', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getWithRightPathNames('test', 42).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const request = providers.httpMock.expectOne('base_url/examples/42?param=test');
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should throw PathParamNotFoundError', () => {
    expect(() =>
      providers.testDecoratorService.getThatThrowError(1).subscribe()
    ).toThrowError(`Path parameter 'wrong-name' was not found in the path 'examples/:id'`);

    providers.httpMock.expectNone(() => true);
  });
});

describe('Path decorator parser injection', () => {
  @Injectable()
  @BaseUrl('base_url')
  class TestCurlyPathDecoratorService extends RestAngularClient {

    @GET('examples/{id}/{param}')
    public getExampleByIdAndParam(@Path('id') id: number, @Path('param') param: string): Observable<any> {
      return null;
    }

    @GET('examples/{param}/{id}')
    public getExampleByIdAndParamInvert(@Path('id') id: number, @Path('param') param: string): Observable<any> {
      return null;
    }
  }

  const providers = getDecoratorProviders(TestCurlyPathDecoratorService, [
    {provide: PathParserFactory, useClass: CurlyPathParserFactory}
  ]);

  it('should parse curly params', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExampleByIdAndParam(1, 'attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/1/attr');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });


  it('should parse inverted parameters', () => {
    const mockResponse = 'response';

    providers.testDecoratorService.getExampleByIdAndParamInvert(1, 'attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = providers.httpMock.expectOne('base_url/examples/attr/1');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });
});
