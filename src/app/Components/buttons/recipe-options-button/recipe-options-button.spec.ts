import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeOptionsButton } from './recipe-options-button';

describe('RecipeOptionsButton', () => {
  let component: RecipeOptionsButton;
  let fixture: ComponentFixture<RecipeOptionsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeOptionsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeOptionsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
