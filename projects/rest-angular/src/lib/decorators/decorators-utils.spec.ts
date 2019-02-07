import {Constructor} from '../types/constructor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

export function getDecoratorProviders<T>(serviceClass: Constructor<T>, customProviders = []): {
  testDecoratorService?: T,
  httpMock?: HttpTestingController
} {
  const providers: { testDecoratorService?: T, httpMock?: HttpTestingController } = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      serviceClass,
      ...customProviders
    ]
  }));

  beforeEach(() => providers.testDecoratorService = TestBed.get(serviceClass));
  beforeEach(() => providers.httpMock = TestBed.get(HttpTestingController));

  afterEach(() => providers.httpMock.verify());

  return providers;
}
