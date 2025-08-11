import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationQrComponent } from './reclamation-qr.component';

describe('ReclamationQrComponent', () => {
  let component: ReclamationQrComponent;
  let fixture: ComponentFixture<ReclamationQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
