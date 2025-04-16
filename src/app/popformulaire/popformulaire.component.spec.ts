import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopformulaireComponent } from './popformulaire.component';

describe('PopformulaireComponent', () => {
  let component: PopformulaireComponent;
  let fixture: ComponentFixture<PopformulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopformulaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopformulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
