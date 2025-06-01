import {Component, signal, Signal} from '@angular/core';
import {
  MatActionList,
  MatList,
  MatListItem, MatListItemLine,
  MatListItemTitle,
  MatListOption,
  MatSelectionList
} from '@angular/material/list';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-mat-test',
  imports: [
    MatListItem,
    MatActionList,
    MatListItemTitle,
    MatListItemLine,
    MatList,
    MatInput,
  ],
  templateUrl: './mat-test.html',
  styleUrl: './mat-test.scss',
  // host:{ '[style.--mat-list-list-item-one-line-container-height]': '1' }
})
export class MatTest {

  appState : State;
  constructor() {
    this.appState = {
      daily:
        new Daily("daily"),
      weekly:[
        new Daily("Monday"),
        new Daily("Wednesday"),
        new Daily("Friday"),
      ]
    }
  }
  mainScreen = signal<boolean>(false);

  click($event: MouseEvent) {
    this.mainScreen.update(v=>!v);
  }
  // addSet(sets: ExerciseSet []){
  //   sets.push({reps:10,size:"50kg"});
  // }
  // removeSet(sets: ExerciseSet []){
  //   sets.pop();
  // }
  save() {

  }

  undo() {

  }
}
interface State {
  daily : Daily,
  weekly : Daily [],
}

interface IDaily {
  name: string,
  exercises?: Exercise [],
  addExercise?: (name:string) => void,
  removeExercise?: (index:number|null) => void,
  visibility: boolean,
  toggleVisible(): void,
}
class Daily implements IDaily {
  public name: string;
  public exercises: Exercise[];
  public addExercise (name: string){
    this.exercises.push( new Exercise(name) );
  }
  public removeExercise(index: number | null= null){
    if (index == null)
      this.exercises.pop();
    else
      this.exercises.splice(index,1);
  };
  constructor(name: string) {
    this.name = name;
    this.exercises = [];
  }

  toggleVisible(): void {
      this.visibility = !this.visibility;
  }
  visibility: boolean = false;
}

interface IExercise{
  name: string,
  sets?: ExerciseSet [],
  addSet (reps:string,kilo:string): void,
  removeSet(index:number): void,
  toggleVisible(): void,
  visible: boolean,
}
class Exercise implements IExercise{
  public name: string;
  public sets: ExerciseSet[];
  public visible: boolean;
  constructor(name: string) {
    this.name = name;
    this.sets = [];
    this.visible = true;
  }

  toggleVisible(): void {
      this.visible = !this.visible;
  }
  addSet(reps: string, kilo: string): void {
     this.sets.push( new ExerciseSet(reps,kilo) );
  }
  removeSet(index: number | null = null): void {
    if (index == null)
      this.sets.pop();
    else
      this.sets.splice(index,1);
  }
}

interface IExerciseSet {
  reps: string,
  size?: string,
}
class ExerciseSet implements IExerciseSet {
  public reps: string;
  public size: string;
  constructor(reps: string, size: string) {
    this.reps = reps;
    this.size = size;
  }
}
