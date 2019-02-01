import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseUrl} from './base-url-decorator';
import {RestAngularClient} from '../rest-angular-client';
import {POST} from './post-decorator';
import {Body} from './body-decorator';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';


@Injectable()
@BaseUrl('base_url')
export class TestBodyDecoratorService extends RestAngularClient {

  @POST('examples')
  public createExample(@Body() example: any): Observable<any> {
    return null;
  }

  @POST('examples/body')
  public createExampleBody(@Body() body: any): Observable<any> {
    return null;
  }
}

describe('Body Decorator', () => {
  let testBodyDecoratorService: TestBodyDecoratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestBodyDecoratorService
    ]
  }));

  beforeEach(() => testBodyDecoratorService = TestBed.get(TestBodyDecoratorService));
  beforeEach(() => httpMock = TestBed.get(HttpTestingController));

  it('should make a POST with body', () => {
    const mockResponse = 'response';

    testBodyDecoratorService.createExample('example').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toBe('example');
    mockRequest.flush(mockResponse);
  });

  it('should not throw error', () => {
    const mockResponse = 'response';

    testBodyDecoratorService.createExampleBody({msg: 'body message'}).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples/body');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body.msg).toBe('body message');
    mockRequest.flush(mockResponse);
  });

  it('should throw error when using multiple body parameters', () => {
    expect(() => {
      class TestBodyMultiError extends RestAngularClient {

        @POST('examples/body/multi')
        public createExampleBodyMulti(@Body() body: any, @Body() body2: any): Observable<any> {
          return null;
        }
      }
    }).toThrowError(`Only one '@Body()' decorator for each method is supported`);
  });
});
