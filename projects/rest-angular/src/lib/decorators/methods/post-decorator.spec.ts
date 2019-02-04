import {Injectable} from '@angular/core';
import {BaseUrl} from '../client/base-url-decorator';
import {Body} from '../parameters/body-decorator';
import {Observable} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {POST} from './post-decorator';
import {RestAngularClient} from '../../rest-angular-client';

@Injectable()
@BaseUrl('base_url')
export class TestPostDecoratorService extends RestAngularClient {

  @POST('examples')
  public createExample(): Observable<any> {
    return null;
  }

  @POST('examples')
  public createExampleBody(@Body example: any): Observable<any> {
    return null;
  }
}

describe('POST Decorator', () => {
  let testPostDecoratorService: TestPostDecoratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TestPostDecoratorService
    ]
  }));

  beforeEach(() => testPostDecoratorService = TestBed.get(TestPostDecoratorService));
  beforeEach(() => httpMock = TestBed.get(HttpTestingController));

  it('should make a POST', () => {
    const mockResponse = 'response';

    testPostDecoratorService.createExample().subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toBeNull();
    mockRequest.flush(mockResponse);
  });

  it('should make a POST with body', () => {
    const mockResponse = 'response';

    testPostDecoratorService.createExampleBody({msg: 'body message'}).subscribe(
      res => {
        expect(res).toBe(mockResponse);
      },
      err => fail(`expected a response, but got error: ${err}`)
    );

    const mockRequest = httpMock.expectOne('base_url/examples');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body.msg).toBe('body message');
    mockRequest.flush(mockResponse);
  });
});
