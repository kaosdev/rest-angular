import {ParameterDecoratorFactory, RestParameterDecorator} from '../../factories/parameter-decorator-factory';

export function Path(name: string): RestParameterDecorator {
  return new ParameterDecoratorFactory().makeDecorator((endpoint, index) => {
    if (!endpoint.pathParameterNames) {
      endpoint.pathParameterNames = [];
    }

    endpoint.pathParameterNames[index] = name;

    return endpoint;
  });
}
