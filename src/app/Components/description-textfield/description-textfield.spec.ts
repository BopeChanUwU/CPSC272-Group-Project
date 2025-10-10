import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTextfield } from './description-textfield';

describe('DescriptionTextfield', () => {
  let component: DescriptionTextfield;
  let fixture: ComponentFixture<DescriptionTextfield>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionTextfield]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionTextfield);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
