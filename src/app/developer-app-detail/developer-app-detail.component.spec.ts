import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeveloperAppDetailComponent} from './developer-app-detail.component';

describe('DeveloperAppDetailComponent', () => {
  let component: DeveloperAppDetailComponent;
  let fixture: ComponentFixture<DeveloperAppDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [DeveloperAppDetailComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(DeveloperAppDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
