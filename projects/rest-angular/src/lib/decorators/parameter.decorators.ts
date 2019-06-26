import {ParameterDecoratorFactory, RestParameterDecorator} from './factories/parameter-decorator-factory';
import {MultipleDecoratorsError} from '../errors/multiple-decorators-error';

const PARAMETER_DECORATOR_FACTORY = new ParameterDecoratorFactory();

export const Body: RestParameterDecorator = PARAMETER_DECORATOR_FACTORY.makeDecorator((endpoint, index) => {
  if (endpoint.bodyParamIndex !== undefined) {
    throw new MultipleDecoratorsError('Body', 'method');
  }

  endpoint.bodyParamIndex = index;

  return endpoint;
});

export function Path(name: string): RestParameterDecorator {
  return PARAMETER_DECORATOR_FACTORY.makeDecorator((endpoint, index) => {
    if (!endpoint.pathParameterNames) {
      endpoint.pathParameterNames = [];
    }

    endpoint.pathParameterNames[index] = name;

    return endpoint;
  });
}

export function Query(name: string): RestParameterDecorator {
  return PARAMETER_DECORATOR_FACTORY.makeDecorator((endpoint, index) => {
    if (!endpoint.queryParameterNames) {
      endpoint.queryParameterNames = [];
    }

    endpoint.queryParameterNames[index] = name;

    return endpoint;
  });
}

export const QueryMap: RestParameterDecorator = PARAMETER_DECORATOR_FACTORY.makeDecorator((endpoint, index) => {
  if (!endpoint.queryParameterNames) {
    endpoint.queryParameterNames = [];
  }

  endpoint.queryParameterNames[index] = '';

  return endpoint;
});

export function HeaderParam(name: string): RestParameterDecorator {
  return PARAMETER_DECORATOR_FACTORY.makeDecorator((endpoint, index) => {
    if (!endpoint.headerParameterNames) {
      endpoint.headerParameterNames = [];
    }

    endpoint.headerParameterNames[index] = name;

    return endpoint;
  });
}
