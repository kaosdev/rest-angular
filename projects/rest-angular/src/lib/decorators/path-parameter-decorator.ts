import {PATH_PARAM_MAP_META} from '../factories/decorator-factory';
import {RestAngularClient} from '../rest-angular-client';

export function Path(name: string) {
  return function (target: RestAngularClient, propertyKey: string, propertyIndex: number) {
    const metaKey = PATH_PARAM_MAP_META + propertyKey;
    const pathParams: string[] = Reflect.getMetadata(metaKey, target) || [];

    pathParams[propertyIndex] = name;

    Reflect.defineMetadata(metaKey, pathParams, target);
  };
}
