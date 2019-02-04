import {ParameterDecoratorFactory} from '../../factories/parameter-decorator-factory';
import {MultipleDecoratorsError} from '../../errors/multiple-decorators-error';

export const Body = ParameterDecoratorFactory.makeDecorator((endpoint, index) => {
  if (endpoint.bodyParamIndex !== undefined) {
    throw new MultipleDecoratorsError('Body', 'method');
  }

  endpoint.bodyParamIndex = index;

  return endpoint;
});
