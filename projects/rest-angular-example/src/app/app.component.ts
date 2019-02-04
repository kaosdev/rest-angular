import {Component, OnInit} from '@angular/core';
import {TestGetService} from './get-decorator/test-get.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
