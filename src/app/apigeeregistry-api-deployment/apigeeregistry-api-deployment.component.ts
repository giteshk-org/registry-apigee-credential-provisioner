import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-apigeeregistry-api-deployment',
  templateUrl: './apigeeregistry-api-deployment.component.html',
  styleUrls: ['./apigeeregistry-api-deployment.component.sass']
})
export class ApigeeregistryApiDeploymentComponent implements OnInit {
  project = "";
  location = "";
  api = "";
  deployment = ""
  gatewayInfo = {
    found: false,
    gatewayType: "",
    apigeeOrg: "",
    apigeeApiProduct: ""
  }

  constructor(private activatedRoute: ActivatedRoute, private backend: BackendService) {
  }

  ngOnInit(): void {
    this.project = this.activatedRoute.snapshot.params['project'];
    this.location = this.activatedRoute.snapshot.params['location'];
    this.api = this.activatedRoute.snapshot.params['api'];
    this.deployment = this.activatedRoute.snapshot.params['deployment'];
    this.backend.getApiDeployment(this.project, this.location, this.api, this.deployment).subscribe((data) =>
      this.gatewayInfo = {
        found: true,
        gatewayType: "apigee",
        apigeeOrg: data.annotations['apigee-org'],
        apigeeApiProduct: data.annotations['apigee-apiproduct'],
      }
    );
  }
}
