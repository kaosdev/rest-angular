import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getDecoratorProviders} from '../decorators-utils.spec';

import {BaseUrl} from '..';
import {RestAngularClient} from '../../rest-angular-client';
import {OPTIONS} from './options.decorator';

describe('OPTIONS Decorator', () => {
    @Injectable()
    @BaseUrl('base_url')
    class TestOptionsDecoratorService extends RestAngularClient {

        @OPTIONS('examples')
        public createExample(): Observable<any> {
            return null;
        }
    }

    const providers = getDecoratorProviders(TestOptionsDecoratorService);

    it('should make a OPTIONS', () => {
        const mockResponse = 'response';

        providers.testDecoratorService.createExample().subscribe(
            res => {
                expect(res).toBe(mockResponse);
            },
            err => fail(`expected a response, but got error: ${err}`)
        );

        const mockRequest = providers.httpMock.expectOne('base_url/examples');
        expect(mockRequest.request.method).toBe('OPTIONS');
        mockRequest.flush(mockResponse);
    });
});
