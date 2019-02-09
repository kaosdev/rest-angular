import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TestGetComponent} from './get-decorator/test-get/test-get.component';
import {TestPostComponent} from './post-decorator/test-post/test-post.component';
import {RouterModule} from '@angular/router';
import {CurlyPathParserFactory, PathParserFactory, REST_BASE_URL} from 'rest-angular-decorators';

@NgModule({
  declarations: [
    AppComponent,
    TestGetComponent,
    TestPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'test-get', component: TestGetComponent },
      { path: 'test-post', component: TestPostComponent },
    ])
  ],
  providers: [
    {provide: REST_BASE_URL, useValue: 'https://jsonplaceholder.typicode.com'},
    {provide: PathParserFactory, useClass: CurlyPathParserFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
