import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSelectionComponent } from './comp-selection.component';

describe('CompSelectionComponent', () => {
  let component: CompSelectionComponent;
  let fixture: ComponentFixture<CompSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
