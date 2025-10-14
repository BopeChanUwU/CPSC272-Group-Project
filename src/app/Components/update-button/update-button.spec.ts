import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateButton } from './update-button';

describe('UpdateButton', () => {
  let component: UpdateButton;
  let fixture: ComponentFixture<UpdateButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
