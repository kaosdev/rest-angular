import {Injectable} from '@angular/core';
import {BaseUrl} from '../client/base-url-decorator';
import {GET} from './get-decorator';
import {Observable} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Path} from '../parameters/path-parameter-decorator';
import {RestAngularClient} from '../../rest-angular-client';

@Injectable()
@BaseUrl('base_url')
export class TestGetDecoratorService extends RestAngularClient {

  @GET('examples')
  public getExamples(): Observable<any> {
    return null;
  }
}

@Injectable()
@BaseUrl('base_url')
export class TestGetPathParameterService extends RestAngularClient {

  @GET('examples/:id')
  public getExample(@Path('id') id: number): Observable<any> {
    return null;
  }

  @GET('examples/:id/param/:param')
  public getExampleParam(
    @Path('id') id: number,
    @Path('param') param: string
  ): Observable<any> {
    return null;
  }
}

describe('GET Decorator', () => {
  let testGetDecoratorService: TestGetDecoratorService;
  let testGetPathParameterService: TestGetPathParameterService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestGetDecoratorService,
      TestGetPathParameterService
    ]
  }));

  beforeEach(() => testGetDecoratorService = TestBed.get(TestGetDecoratorService));
  beforeEach(() => testGetPathParameterService = TestBed.get(TestGetPathParameterService));
  beforeEach(() => httpMock = TestBed.get(HttpTestingController));

  it('should make a GET', () => {
    const mockResponse = 'response';

    testGetDecoratorService.getExamples().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  it('should make a GET with passed path parameter', () => {
    const mockResponse = 'response';

    testGetPathParameterService.getExample(1).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples/1');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  it('should make a GET with 2 parameters', () => {
    const mockResponse = 'response';

    testGetPathParameterService.getExampleParam(1, 'two').subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples/1/param/two');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponse);
  });

  afterEach(() => httpMock.verify());
});
