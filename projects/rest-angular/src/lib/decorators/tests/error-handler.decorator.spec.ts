import {RestAngularApi} from '../../rest-angular-api';
import {BaseUrl} from '../client.decorators';
import {Observable, of, throwError} from 'rxjs';
import {getDecoratorProviders} from './decorators-utils.spec';
import {GET} from '../method.decorators';
import {RestOnError} from '../../http/error-handler/error-handler';
import {HttpErrorResponse} from '@angular/common/http';

@BaseUrl('url')
class TestOnError extends RestAngularApi implements RestOnError {

  @GET('path')
  testThrowError(): Observable<any> {
    return;
  }

  onError(error: any): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      return of('catched error ' + error.status);
    }
    return throwError('not an http error');
  }
}

describe('RestOnError interface', () => {
  const providers = getDecoratorProviders(TestOnError);

  it('should catch http error', () => {
    providers.testDecoratorService.testThrowError().subscribe(
      res => expect(res).toBe('catched error 400'),
      err => fail(`expected a response, but got error ${JSON.stringify(err)}`),
    );

    const req = providers.httpMock.expectOne('url/path');
    req.flush('error', {
      status: 400,
      statusText: 'Bad Request'
    });
  });

  it('should catch error event', () => {
    spyOn(providers.testDecoratorService.httpClient, 'request').and.returnValue(throwError('error'));

    providers.testDecoratorService.testThrowError().subscribe(
      res => fail(`expected an error, but got response ${res}`),
      err => expect(err).toBe('not an http error'),
    );
  });
});
