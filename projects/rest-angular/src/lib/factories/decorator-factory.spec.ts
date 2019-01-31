import { RestMethodDecoratorFactory } from './decorator-factory';
import { of, Observable } from 'rxjs';
import { RestAngularClient, BaseUrl } from '../decorators/base-url-decorator';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RestMethodDecoratorFactory', () => {
    const methodDecoratorFactory = new RestMethodDecoratorFactory();

    const testDecorator = methodDecoratorFactory.makeDecorator('path', (http, url) => {
        return of('hello');
    });

    @Injectable()
    @BaseUrl('base')
    class TestRestAngularClient extends RestAngularClient {
        @testDecorator
        testDecoratorMethod(): Observable<string> { return null; }
    }

    const propertyDescriptor = {
    } as PropertyDescriptor;

    let testRestAngularClient: TestRestAngularClient;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            TestRestAngularClient
        ]
    }));

    beforeEach(() => testRestAngularClient = TestBed.get(TestRestAngularClient));

    it('should return a function', () => {
        expect(testDecorator).toEqual(jasmine.any(Function));
    });

    it('should override method', () => {
        testRestAngularClient.testDecoratorMethod().subscribe(res => expect(res).toBe('hello'));
    });
});
