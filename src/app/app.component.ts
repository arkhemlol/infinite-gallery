import { Component, OnInit } from '@angular/core';
import { MockBackendService } from './mock/mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MockBackendService
  ]
})
export class AppComponent implements OnInit {

  constructor(public backend: MockBackendService) {

  }

  public ngOnInit() {
    this.backend.start();
  }
}
