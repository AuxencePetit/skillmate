import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAdminViewComponent } from './mission-admin-view.component';

describe('MissionAdminViewComponent', () => {
  let component: MissionAdminViewComponent;
  let fixture: ComponentFixture<MissionAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionAdminViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
