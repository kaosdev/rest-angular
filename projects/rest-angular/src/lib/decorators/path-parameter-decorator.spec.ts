import {Injectable} from '@angular/core';
import {BaseUrl} from './base-url-decorator';
import {GET} from './get-decorator';
import {Path} from './path-parameter-decorator';
import {Observable} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RestAngularClient} from '../rest-angular-client';


@Injectable()
@BaseUrl('base_url')
export class TestPathDecoratorService extends RestAngularClient {

  @GET('examples/:id')
  public getExampleById(@Path('id') id: number): Observable<any> {
    return null;
  }

  @GET('examples/:param')
  public getExampleByParam(@Path('param') param: string): Observable<any> {
    return null;
  }

  @GET('examples/:id/:param')
  public getExampleByIdAndParam(@Path('id') id: number, @Path('param') param: string): Observable<any> {
    return null;
  }
}

describe('Path decorator', () => {
  let testPathDecoratorService: TestPathDecoratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestPathDecoratorService,
    ]
  }));

  beforeEach(() => testPathDecoratorService = TestBed.get(TestPathDecoratorService));
  beforeEach(() => httpMock = TestBed.get(HttpTestingController));

  it('should parse parameters', () => {
    const mockResponse = 'response';

    testPathDecoratorService.getExampleByIdAndParam(1, 'attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples/1/attr');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  it('should not throw PathParamNotFoundError', () => {
    const mockResponse = 'response';

    testPathDecoratorService.getExampleById(1).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    testPathDecoratorService.getExampleByParam('attr').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const byIdMockRequest = httpMock.expectOne('base_url/examples/1');
    expect(byIdMockRequest.request.method).toBe('GET');

    const byParamMockRequest = httpMock.expectOne('base_url/examples/attr');
    expect(byParamMockRequest.request.method).toBe('GET');

    byIdMockRequest.flush(mockResponse);
    byParamMockRequest.flush(mockResponse);
  });
});
