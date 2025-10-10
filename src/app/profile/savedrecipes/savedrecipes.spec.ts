import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Savedrecipes } from './savedrecipes';

describe('Savedrecipes', () => {
  let component: Savedrecipes;
  let fixture: ComponentFixture<Savedrecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Savedrecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Savedrecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
