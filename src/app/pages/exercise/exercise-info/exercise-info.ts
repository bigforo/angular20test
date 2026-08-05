import { NgStyle } from '@angular/common';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { CommonService } from '../../../classes/common.service';
import { Activity } from '../../../classes/state.interface';
import { ExHistory } from '../../../components/ex-history/ex-history';

@Component({
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonContent,
    IonLabel,
    NgStyle,
    IonIcon,
    IonList,
    IonItem,
    FormsModule,
    IonRouterLink,
    RouterLink,
    IonBackButton,
    ExHistory,
  ],
  selector: 'app-exercise-info',
  styleUrl: './exercise-info.scss',
  templateUrl: './exercise-info.html',
})
export class ExerciseInfo {
  service = inject(CommonService);
  private router = inject(Router);

  id = input<string>();
  selectedExercise = linkedSignal(() => {
    const ex = this.service.exerciseById(this.id() ?? '');
    if (ex === undefined) return null;
    return ex;
  });
  activity = linkedSignal(() => {
    const ex = this.service.exerciseById(this.id() ?? '');
    if (ex === undefined) return Activity.unknowActivity();
    const act = this.service.findActivityByExercise(ex.id);
    if (act === undefined) return new Activity(ex.id);
    return act;
  });

  constructor() {
    addIcons({ chevronForwardOutline, chevronBackOutline });
  }
  async click(activity: Activity | null) {
    if (activity == null) return;
    this.service.startSessionIfNotStarted();
    this.service.findOrStartActivityByExercise(activity.id);
    await this.router.navigate(['/app/tabs/current']);
  }

  protected readonly Activity = Activity;

  private readonly navController = inject(NavController);

  async navBack() {
    await this.navigateToExerciseByOffset(-1);
  }

  async navForward() {
    await this.navigateToExerciseByOffset(1);
  }

  private async navigateToExerciseByOffset(offset: -1 | 1) {
    const exercises = this.service.exercises();
    const currentIndex = exercises.findIndex((exercise) => exercise.id === this.id());
    const targetExercise = exercises[currentIndex + offset];

    if (targetExercise === undefined) return;

    const url = `exercise/${targetExercise.id}`;
    if (offset < 0) {
      this.navController.navigateBack(url);
      return;
    }
    this.navController.navigateForward(url);
  }

  clickToNavigate(id: number) {
    if (id > -1) {
      void this.router.navigate(['session/'], { queryParams: { id: id } });
    }
  }
}
