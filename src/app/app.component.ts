import {Component, OnInit} from '@angular/core';
import {LocalService} from './local.service';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'credential-provisioner';
  authenticated = false

  constructor(private localStore: LocalService) {
  }

  ngOnInit(): void {
    if (this.localStore.getData("oneTapLogInCredentials"))
      this.authenticated = true
  }
}
