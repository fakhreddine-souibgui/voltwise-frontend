import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaceVerificationComponent } from './admin-face-verification.component';

describe('AdminFaceVerificationComponent', () => {
  let component: AdminFaceVerificationComponent;
  let fixture: ComponentFixture<AdminFaceVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFaceVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFaceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
