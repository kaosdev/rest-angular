import {MethodDecoratorFactory, RestMethodDecorator} from '../factories/method-decorator-factory';
import {NotAllowedDecoratorError} from '../errors/not-allowed-decorator-error';

const METHOD_DECORATOR_FACTORY = new MethodDecoratorFactory();

export function PUT(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('PUT', path, (http, request) => {
    return http.put(
      request.url,
      request.body,
      {
        params: request.queryParams
      }
    );
  });
}

export function POST(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('POST', path, (http, request) => {
    return http.post(
      request.url,
      request.body,
      {
        params: request.queryParams
      }
    );
  });
}

export function PATCH(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('PATCH', path, (http, request) => {
    return http.patch(
      request.url,
      request.body,
      {
        params: request.queryParams
      }
    );
  });
}

export function OPTIONS(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('OPTIONS', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'OPTIONS');
    }

    return http.options(
      request.url,
      {
        params: request.queryParams
      }
    );
  });
}

export function GET(path: string) {
  return METHOD_DECORATOR_FACTORY.makeDecorator('GET', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'GET');
    }

    return http.get(request.url, {
      params: request.queryParams
    });
  });
}

export function DELETE(path: string): RestMethodDecorator {
  return METHOD_DECORATOR_FACTORY.makeDecorator('DELETE', path, (http, request) => {
    if (request.body) {
      throw new NotAllowedDecoratorError('Body', 'DELETE');
    }

    return http.delete(
      request.url,
      {
        params: request.queryParams
      }
    );
  });
}
