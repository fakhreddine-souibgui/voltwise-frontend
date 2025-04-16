import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdemoComponent } from './popdemo.component';

describe('PopdemoComponent', () => {
  let component: PopdemoComponent;
  let fixture: ComponentFixture<PopdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopdemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
