import {Constructor} from './constructor';

export interface Injection<T> {
  token: any;
  default: Constructor<T>;
}
