import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionChefProjetViewComponent } from './mission-chef-projet-view.component';

describe('MissionChefProjetViewComponent', () => {
  let component: MissionChefProjetViewComponent;
  let fixture: ComponentFixture<MissionChefProjetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionChefProjetViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionChefProjetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
