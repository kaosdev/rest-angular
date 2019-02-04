import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {REST_BASE_URL, PathParserFactory} from 'rest-angular';
import {CurlyPathParserFactory} from '../../../rest-angular/src/lib/http/path-parser/path-parser-factory';
import { TestGetComponent } from './get-decorator/test-get/test-get.component';
import { TestPostComponent } from './post-decorator/test-post/test-post.component';
import {RouterModule} from '@angular/router';

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
