import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipButton } from './skip-button';

describe('SkipButton', () => {
  let component: SkipButton;
  let fixture: ComponentFixture<SkipButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
