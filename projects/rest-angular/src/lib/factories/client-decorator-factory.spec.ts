import {Injectable} from '@angular/core';
import {BaseUrl} from '../decorators';
import {RestAngularClient} from '../rest-angular-client';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ClientDecoratorFactory} from './client-decorator-factory';

describe('ClientDecoratorFactory', () => {
  const testDecorator = ClientDecoratorFactory.makeDecorator('meta-key', (metadata) => {
    return 'hello world';
  });

  @Injectable()
  @BaseUrl('base')
  @testDecorator
  class TestRestAngularClient extends RestAngularClient {
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

  it('should set metadata', () => {
    expect(testRestAngularClient['metadataTarget'].getMetadata('meta-key')).toEqual('hello world');
  });
});
