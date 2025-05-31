import { Component } from '@angular/core';
import {MatList, MatListItem, MatListOption, MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-mat-test',
  imports: [
    MatListItem,
    MatSelectionList
  ],
  templateUrl: './mat-test.html',
  styleUrl: './mat-test.scss',
  // host:{ '[style.--mat-list-list-item-one-line-container-height]': '1' }
})
export class MatTest {
  public week: Exercise [] = [
    {
      name:"Exercise 1",
      sets: [
        {
          reps:10,
          size:"50kg"
        },
        {
          reps:10,
          size:"60kg"
        },
        {
          reps:10,
          size:"60kg"
        },
      ]
    },
    {
      name:"Exercise 2",
      sets: [
        {
          reps:10,
          size:"50kg"
        },
        {
          reps:10,
          size:"60kg"
        },
        {
          reps:10,
          size:"60kg"
        },
      ]
    }
  ];

}

interface Exercise{
  name: string,
  sets: ExerciseSet []
}
interface ExerciseSet {
  reps: number,
  size: string,
}
