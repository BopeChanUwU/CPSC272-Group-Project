import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tindercards } from './tindercards';

describe('Tindercards', () => {
  let component: Tindercards;
  let fixture: ComponentFixture<Tindercards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tindercards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tindercards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
