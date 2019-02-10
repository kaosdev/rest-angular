# Rest Angular Decorators
An Angular Http Client for fast Rest APIs.

## Installation

```
npm install rest-angular-decorators
```

## Basic Usage

Create a new service that extends RestAngularClient.
Declare methods, parameters and base url.

```ts
@Injectable({
  providedIn: 'root'
})
@BaseUrl('https://jsonplaceholder.typicode.com')
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

```ts
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

## Customization

What if you don't like to write url like these `GET('path/:id')`?
What if you like curly braces a lot?

Just add this provider in AppModule and you can use paths with style `GET('path/{id}')`
```ts
{provide: PathParserFactory, useClass: CurlyPathParserFactory}
```

You can also provide your own factories for:
- PathParserFactory 
- BodyParserFactory
- QueryParserFactory

## Contribute

Every contribution is really appreciated.

## License

Rest Angular Decorators is released under the MIT license. [Read license](LICENSE).
