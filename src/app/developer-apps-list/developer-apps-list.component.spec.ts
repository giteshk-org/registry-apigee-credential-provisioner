import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeveloperAppsListComponent} from './developer-apps-list.component';

describe('DeveloperAppsComponent', () => {
  let component: DeveloperAppsListComponent;
  let fixture: ComponentFixture<DeveloperAppsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DeveloperAppsListComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(DeveloperAppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
