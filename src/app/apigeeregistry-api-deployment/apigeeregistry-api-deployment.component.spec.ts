import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApigeeregistryApiDeploymentComponent} from './apigeeregistry-api-deployment.component';

describe('ApigeeregistryApiDeploymentComponent', () => {
  let component: ApigeeregistryApiDeploymentComponent;
  let fixture: ComponentFixture<ApigeeregistryApiDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ApigeeregistryApiDeploymentComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ApigeeregistryApiDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
