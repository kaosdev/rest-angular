import {Inject, InjectionToken, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BODY_PARAM_INDEX_META, PATH_PARAM_MAP_META} from './factories/decorator-factory';

export const REST_BASE_URL = new InjectionToken<string>(null);

export class MissingRestBaseUrlError extends Error {

  constructor() {
    super('REST_BASE_URL not provided');
  }
}

export abstract class RestAngularClient {
  constructor(
    @Inject(HttpClient)
    public httpClient: HttpClient,
    @Optional()
    @Inject(REST_BASE_URL)
    protected restBaseUrl: string,
  ) {
  }

  // TODO: test error condition
  public baseUrl() {
    try {
      return this.restBaseUrl;
    } catch (e) {
      throw new MissingRestBaseUrlError();
    }
  }

  public getPathParams(callHandlerUuid: string): string[] {
    return Reflect.getMetadata(PATH_PARAM_MAP_META + callHandlerUuid, this);
  }

  public getBodyParam(callHandlerUuid: string): any {
    return Reflect.getMetadata(BODY_PARAM_INDEX_META + callHandlerUuid, this);
  }
}
