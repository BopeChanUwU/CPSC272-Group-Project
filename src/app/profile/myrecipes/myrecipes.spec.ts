import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myrecipes } from './myrecipes';

describe('Myrecipes', () => {
  let component: Myrecipes;
  let fixture: ComponentFixture<Myrecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myrecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myrecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
