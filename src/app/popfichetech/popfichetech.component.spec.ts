import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopfichetechComponent } from './popfichetech.component';

describe('PopfichetechComponent', () => {
  let component: PopfichetechComponent;
  let fixture: ComponentFixture<PopfichetechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopfichetechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopfichetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
