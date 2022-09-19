import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {google} from '@google-cloud/apigee-registry/build/protos/protos';
import {LocalService} from './local.service';
import ApiDeployment = google.cloud.apigeeregistry.v1.ApiDeployment;

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private localStore: LocalService) {
  }

  getApiDeployment(project: string, location: string, api: string, deployment: string) {
    return this.http.get<ApiDeployment>(`/registry-backend/projects/${project}/locations/${location}/apis/${api}/deployments/${deployment}`);
    //return this.http.get<ApiDeployment>(`https://apigeeregistry.googleapis.com/v1/projects/${project}/locations/${location}/apis/${api}/deployments/${deployment}`, this.options());
  }

  getDeveloperApps(apigeeOrg: string) {
    return this.http.get<any[]>(`/registry-backend/organizations/${apigeeOrg}/developer-apps`);
  }

  private options() {
    return {headers: {"Authorization": "Bearer " + this.localStore.getData("oneTapLogInCredentials")}};
  }
}
