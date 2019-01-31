import { InjectionToken, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function BaseUrl(baseUrl: string) {
    return function <T extends Constructor<RestAngularClient>>(ctor: T) {
        ctor.prototype.baseUrl = function () {
            return baseUrl;
        };

        return ctor;
    };
}

interface Constructor<T> {
    new(...args: any[]): T;
}

export const REST_BASE_URL = new InjectionToken<string>(null);

export const MISSING_REST_BASE_URL_ERROR = 'REST_BASE_URL not provided';

export class MissingRestBaseUrlError extends Error {

    constructor() {
        super(MISSING_REST_BASE_URL_ERROR);
    }
}

export abstract class RestAngularClient {
    baseUrl() {
        try {
            return this.restBaseUrl;
        } catch (e) {
            throw new MissingRestBaseUrlError();
        }
    }

    constructor(
        @Inject(HttpClient)
        public httpClient: HttpClient,
        @Optional()
        @Inject(REST_BASE_URL)
        protected restBaseUrl: string,
    ) { }
}
