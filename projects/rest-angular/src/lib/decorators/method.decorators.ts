import {MethodDecoratorFactory, RestMethodDecorator, RestMethodDecoratorFactory} from './factories/method-decorator-factory';
import {RestHeaders} from '../types/headers';

const METHOD_DECORATOR_FACTORY = new MethodDecoratorFactory();
const REST_METHOD_DECORATOR_FACTORY = new RestMethodDecoratorFactory();

export function PUT(path: string): RestMethodDecorator {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'PUT';
    return endpointMap;
  });
}

export function POST(path: string): RestMethodDecorator {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'POST';
    return endpointMap;
  });
}

export function PATCH(path: string): RestMethodDecorator {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'PATCH';
    return endpointMap;
  });
}

export function OPTIONS(path: string): RestMethodDecorator {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'OPTIONS';
    return endpointMap;
  });
}

export function GET(path: string) {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'GET';
    return endpointMap;
  });
}

export function DELETE(path: string): RestMethodDecorator {
  return REST_METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.templatePath = path;
    endpointMap.methodName = 'DELETE';
    return endpointMap;
  });
}

export function EndpointHeaders(headers: RestHeaders) {
  return METHOD_DECORATOR_FACTORY.makeDecorator<RestHeaders>(endpointMap => {
    endpointMap.headers = headers;
    return endpointMap;
  });
}
