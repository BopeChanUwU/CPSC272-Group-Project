import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislikeButton } from './dislike-button';

describe('DislikeButton', () => {
  let component: DislikeButton;
  let fixture: ComponentFixture<DislikeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DislikeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DislikeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
