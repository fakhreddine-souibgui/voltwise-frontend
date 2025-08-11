import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesPublicitesComponent } from './demandes-publicites.component';

describe('DemandesPublicitesComponent', () => {
  let component: DemandesPublicitesComponent;
  let fixture: ComponentFixture<DemandesPublicitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesPublicitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesPublicitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
