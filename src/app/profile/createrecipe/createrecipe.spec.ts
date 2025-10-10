import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createrecipe } from './createrecipe';

describe('Createrecipe', () => {
  let component: Createrecipe;
  let fixture: ComponentFixture<Createrecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createrecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createrecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
