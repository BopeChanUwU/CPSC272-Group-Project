import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTextfield } from './title-textfield';

describe('TitleTextfield', () => {
  let component: TitleTextfield;
  let fixture: ComponentFixture<TitleTextfield>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleTextfield]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleTextfield);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
