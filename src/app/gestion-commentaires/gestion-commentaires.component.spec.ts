import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommentairesComponent } from './gestion-commentaires.component';

describe('GestionCommentairesComponent', () => {
  let component: GestionCommentairesComponent;
  let fixture: ComponentFixture<GestionCommentairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCommentairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCommentairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
