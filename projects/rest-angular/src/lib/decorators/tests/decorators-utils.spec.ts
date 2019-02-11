import {Constructor} from '../../types/constructor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

interface RestProviders<T> {
  testDecoratorService?: T;
  httpMock?: HttpTestingController;
  restMock?: RestHttpMock;
}

export function getDecoratorProviders<T>(serviceClass: Constructor<T>, customProviders = []): RestProviders<T> {
  const providers: RestProviders<T> = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      serviceClass,
      ...customProviders
    ]
  }));

  beforeEach(() => {
    providers.testDecoratorService = TestBed.get(serviceClass);
    providers.httpMock = TestBed.get(HttpTestingController);
    providers.restMock = new RestHttpMock(providers.httpMock);
  });

  afterEach(() => providers.httpMock.verify());

  return providers;
}

class RestHttpMock {
  constructor(
    private httpMock: HttpTestingController
  ) {
  }

  expectRequest(url: string) {
    return this.httpMock.expectOne(url);
  }
}
