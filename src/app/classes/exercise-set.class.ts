export class ExerciseSetClass implements IExerciseSet {
  public reps: string;
  public size: string;

  constructor(reps: string, size: string) {
    this.reps = reps;
    this.size = size;
  }
}
interface IExerciseSet {
  reps: string,
  size?: string,
}
