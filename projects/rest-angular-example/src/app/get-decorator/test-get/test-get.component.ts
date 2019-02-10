import {Component, OnInit} from '@angular/core';
import {TestGetService} from '../test-get.service';

@Component({
  selector: 'app-test-get',
  templateUrl: './test-get.component.html',
  styleUrls: ['./test-get.component.css']
})
export class TestGetComponent implements OnInit {
  todo: any;

  constructor(
    private testGetService: TestGetService
  ) {
  }

  ngOnInit() {
    this.getTodo(1);
  }

  getTodo(id: number) {
    this.testGetService.getTodos('Product 0+').subscribe(todo => this.todo = todo);
  }

}
