import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'developer-apps-list',
  templateUrl: './developer-apps-list.component.html',
  styleUrls: ['./developer-apps-list.component.sass']
})
export class DeveloperAppsListComponent implements OnInit {
  @Input() apigeeOrg = '';
  @Input() apigeeApiProduct = '';
  apps: any[] = [];

  constructor(private backend: BackendService) {
  }

  async ngOnInit() {
    this.backend.getDeveloperApps(this.apigeeOrg).subscribe(apps => this.apps = apps);
  }
}
