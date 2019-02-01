import {RestAngularClient} from '../rest-angular-client';

export function BaseUrl(baseUrl: string) {
  return function <T extends Constructor<RestAngularClient>>(ctor: T) {
    ctor.prototype.baseUrl = function () {
      return baseUrl;
    };

    return ctor;
  };
}

// TODO: move to types
interface Constructor<T> {
  new(...args: any[]): T;
}
