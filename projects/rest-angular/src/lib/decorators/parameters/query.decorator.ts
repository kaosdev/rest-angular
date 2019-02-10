import {ParameterDecoratorFactory, RestParameterDecorator} from '../../factories/parameter-decorator-factory';

export function Query(name: string): RestParameterDecorator {
  return new ParameterDecoratorFactory().makeDecorator((endpoint, index) => {
    if (!endpoint.queryParameterNames) {
      endpoint.queryParameterNames = [];
    }

    endpoint.queryParameterNames[index] = name;

    return endpoint;
  });
}

