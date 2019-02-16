# Rest Angular Decorators
> Build fast REST APIs using decorators

## Getting Started

### Installing

```
npm install rest-angular-decorators
```

### Basic Usage

Create a new service that extends RestAngularClient.
Declare methods, parameters and base url.

```typescript
@Injectable({
  providedIn: 'root'
})
@BaseUrl('https://jsonplaceholder.typicode.com')
@DefaultHeaders({
  Accept: 'text/html'
})
export class TestService extends RestAngularClient {

  // Path parameters
  @GET('todos/:id')
  getTodo(
    @Path('id') id: number
  ): Observable<any> { return null; }

  // Body
  @POST('todos')
  createTodo(
    @Body: todo: any
  ): Observable<any> { return null; }
  
  // Query parameters
  @GET('todos')
  getTodos(
    @Query('limit') limit: number,
    @QueryMap otherFilters: object
  ): Observable<any[]> { return null }
}
```

Then in component just use the service

```typescript
@Component({
  template: `<h1>{{ todoTitle$ | async }}</h1>`
})
class TestComponent {
  todoTitle$ = this.testService.getTodo(42).pipe(
    map(todo => todo.title)
  );
  
  constructor(
    private readonly testService: TestService
  ) {
  }
}
```

## Features

- All rest methods: @GET, @POST, @PUT, @PATCH, @DELETE
- Body parameter: @Body
- Path parameters: @Path
- Query parameters: @Query, @QueryMap
- Base url: @BaseUrl or by Injection of REST_BASE_URL
- Headers: @DefaultHeaders

## Customization

What if you don't like to write url like these `GET('path/:id')`?
What if you like curly braces a lot?

Just add this provider in AppModule and you can use paths with style `GET('path/{id}')`
```typescript
{provide: PathParserFactory, useClass: CurlyPathParserFactory}
```

You can also provide your own factories for:
- PathParserFactory 
- BodyParserFactory
- QueryParserFactory

## Roadmap

- @Headers method decorator
- @Header & @HeaderMap parameter decorator

## Contribute

Every contribution is really appreciated.

## License

Rest Angular Decorators is released under the MIT license. [Read license](LICENSE).
