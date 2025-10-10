import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNDropBox } from './drag-n-drop-box';

describe('DragNDropBox', () => {
  let component: DragNDropBox;
  let fixture: ComponentFixture<DragNDropBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragNDropBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragNDropBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
