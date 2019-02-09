import {ParameterDecoratorFactory, RestParameterDecorator} from '../../factories/parameter-decorator-factory';

export function Path(name: string): RestParameterDecorator {
  return new ParameterDecoratorFactory().makeDecorator((endpoint, index) => {
    if (!endpoint.pathParametersName) {
      endpoint.pathParametersName = [];
    }

    endpoint.pathParametersName[index] = name;

    return endpoint;
  });
}
