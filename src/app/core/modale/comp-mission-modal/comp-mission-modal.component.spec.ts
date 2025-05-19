import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMissionModalComponent } from './comp-mission-modal.component';

describe('CompMissionModalComponent', () => {
  let component: CompMissionModalComponent;
  let fixture: ComponentFixture<CompMissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompMissionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
