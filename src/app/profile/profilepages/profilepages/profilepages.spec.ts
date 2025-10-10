import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profilepages } from './profilepages';

describe('Profilepages', () => {
  let component: Profilepages;
  let fixture: ComponentFixture<Profilepages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profilepages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profilepages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
