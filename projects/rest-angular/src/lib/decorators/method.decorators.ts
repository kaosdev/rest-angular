import {MethodDecoratorFactory, RestMethodDecorator} from './factories/method-decorator-factory';

const METHOD_DECORATOR_FACTORY = new MethodDecoratorFactory();

export function PUT(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('PUT', path);
}

export function POST(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('POST', path);
}

export function PATCH(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('PATCH', path);
}

export function OPTIONS(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('OPTIONS', path);
}

export function GET(path: string) {
  return METHOD_DECORATOR_FACTORY.makeDecorator('GET', path);
}

export function DELETE(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('DELETE', path);
}
