import {Injectable} from '@angular/core';
import {BaseUrl} from '../decorators';
import {RestAngularClient} from '../rest-angular-client';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ParameterDecoratorFactory} from './parameter-decorator-factory';

describe('ParameterDecoratorFactory', () => {
  const testDecorator = ParameterDecoratorFactory.makeDecorator((endpoint, index) => {
    endpoint.templatePath = index.toString();
    return endpoint;
  });

  @Injectable()
  @BaseUrl('base')
  class TestRestAngularClient extends RestAngularClient {
    testDecoratorMethod(@testDecorator param: number): void {
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
    expect(testRestAngularClient['endpointMeta'].get('testDecoratorMethod').templatePath).toEqual('0');
  });
});
