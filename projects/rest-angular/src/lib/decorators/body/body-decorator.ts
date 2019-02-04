import {ParameterDecoratorFactory} from '../../factories/parameter-decorator-factory';

export const Body = ParameterDecoratorFactory.makeDecorator((endpoint, index) => {
  if (endpoint.bodyParamIndex !== undefined) {
    throw new Error(`Only one '@Body()' decorator for each method is supported`);
  }

  endpoint.bodyParamIndex = index;

  return endpoint;
});
