import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionEmployeViewComponent } from './mission-employe-view.component';

describe('MissionEmployeViewComponent', () => {
  let component: MissionEmployeViewComponent;
  let fixture: ComponentFixture<MissionEmployeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionEmployeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionEmployeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
