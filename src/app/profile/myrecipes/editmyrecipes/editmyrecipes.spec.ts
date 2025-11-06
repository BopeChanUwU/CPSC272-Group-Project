import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmyrecipes } from './editmyrecipes';

describe('Editmyrecipes', () => {
  let component: Editmyrecipes;
  let fixture: ComponentFixture<Editmyrecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editmyrecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmyrecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
