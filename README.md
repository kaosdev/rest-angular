# RestAngular
An Angular Http Client for fast Rest APIs.

## Example Usage

```ts
@Injectable()
@BaseUrl('https://jsonplaceholder.typicode.com')
export class TestService extends RestAngularClient {

  @GET('todos')
  getTodos(): Observable<any[]> { return null; }

  @GET('todos/:id')
  getTodo(
    @Path('id') id: number
  ): Observable<any> { return null; }

}
```

## Installation

```
npm install rest-angular-decorators
```
