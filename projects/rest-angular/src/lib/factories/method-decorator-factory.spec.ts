import {MethodDecoratorFactory} from './method-decorator-factory';
import {of, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestAngularClient} from '../rest-angular-client';
import {BaseUrl} from '../decorators';

describe('MethodDecoratorFactory', () => {
  const testDecorator = MethodDecoratorFactory.makeDecorator('path', (http, url) => {
    return of('hello');
  });

  @Injectable()
  @BaseUrl('base')
  class TestRestAngularClient extends RestAngularClient {
    @testDecorator
    testDecoratorMethod(): Observable<string> {
      return null;
    }
  }

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
