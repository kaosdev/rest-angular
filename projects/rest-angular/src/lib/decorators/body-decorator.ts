import 'reflect-metadata';
import {BODY_PARAM_INDEX_META} from '../factories/decorator-factory';
import {RestAngularClient} from '../rest-angular-client';

export function Body() {
  return function (target: RestAngularClient, propertyKey: string, propertyIndex: number) {
    const metaKey = BODY_PARAM_INDEX_META + propertyKey;
    let bodyParamIndex: any = Reflect.getMetadata(metaKey, target);

    if (bodyParamIndex !== undefined) {
      throw new Error(`Only one '@Body()' decorator for each method is supported`);
    }

    bodyParamIndex = propertyIndex;

    Reflect.defineMetadata(metaKey, bodyParamIndex, target);
  };
}
