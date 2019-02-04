import {InjectionToken} from '@angular/core';

export class MissingInjectionError extends Error {

  constructor(token: InjectionToken<any>) {
    super(`${token.toString()} not provided`);
  }
}
