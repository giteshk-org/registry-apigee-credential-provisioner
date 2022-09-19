import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApigeeregistryApiDeploymentComponent} from './apigeeregistry-api-deployment/apigeeregistry-api-deployment.component';

const routes: Routes = [
  {
    path: "projects/:project/locations/:location/apis/:api/deployments/:deployment",
    component: ApigeeregistryApiDeploymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
