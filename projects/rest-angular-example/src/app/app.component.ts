import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rest-angular-example';

  todo: any;

  constructor(
    private testService: TestService
  ) { }

  ngOnInit() {
    this.testService.getTodo(1).subscribe(todo => this.todo = todo);
  }
}
