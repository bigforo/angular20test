import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSets } from './show-sets';

describe('ShowSets', () => {
  let component: ShowSets;
  let fixture: ComponentFixture<ShowSets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
