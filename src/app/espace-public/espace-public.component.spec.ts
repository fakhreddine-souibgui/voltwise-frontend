import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePublicComponent } from './espace-public.component';

describe('EspacePublicComponent', () => {
  let component: EspacePublicComponent;
  let fixture: ComponentFixture<EspacePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacePublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
