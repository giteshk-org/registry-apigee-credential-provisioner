import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'developer-app-detail',
  templateUrl: './developer-app-detail.component.html',
  styleUrls: ['./developer-app-detail.component.sass']
})
export class DeveloperAppDetailComponent implements OnInit {
  @Input() app = {
    name: "",
    displayName: "",
    notes: "",
    appId: "",
    attributes: [{name: "", value: ""}],
    callbackUrl: "",
    createdAt: "",
    developerId: "",
    credentials: [{
      apiProducts: [{apiproduct: "", status: ""}],
      consumerKey: "",
      consumerSecret: "",
      expiresAt: "",
      issuedAt: "",
      status: "",
    }],
    lastModifiedAt: "",
    status: "",
    appFamily: ""
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
