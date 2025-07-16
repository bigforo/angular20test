import {ExerciseClass} from './exercise.class';

export interface IDaily {
  name: string,
  exercises?: ExerciseClass [],
}

export class DailyClass implements IDaily {
  public name: string;
  public exercises: ExerciseClass[];

  public addExercise(name: string) {
    this.exercises.push(new ExerciseClass(name));
  }
  public addExercise2(exercise: ExerciseClass) {
    this.exercises.push(exercise);
  }
  public removeExercise(index: number | null = null) {
    if (index == null)
      this.exercises.pop();
    else
      this.exercises.splice(index, 1);
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


