import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCasiersComponent } from './gestion-casiers.component';

describe('GestionCasiersComponent', () => {
  let component: GestionCasiersComponent;
  let fixture: ComponentFixture<GestionCasiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCasiersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCasiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
