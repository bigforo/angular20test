import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExercises } from './modal-exercises';

describe('ModalExercises', () => {
  let component: ModalExercises;
  let fixture: ComponentFixture<ModalExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExercises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExercises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
