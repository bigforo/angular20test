import {Component, inject, input, linkedSignal} from '@angular/core';
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

  IonTitle, IonToggle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {CommonService} from '../../classes/common.service';
import {Router, RouterLink} from '@angular/router';
import {Activity} from '../../classes/state.interface';
import {EXERCISES} from '../../classes/all-exercises.data';
import {NgStyle} from '@angular/common';
import {addIcons} from 'ionicons';
import {chevronBackOutline, chevronForwardOutline} from 'ionicons/icons';
import {FormsModule} from '@angular/forms';
import {ExHistory} from '../../components/ex-history/ex-history';

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
    IonToggle,
    IonBackButton,
    ExHistory
],
  selector: 'app-exercise-info',
  styleUrl: './exercise-info.scss',
  templateUrl: './exercise-info.html'
})
export class ExerciseInfo {
  service = inject(CommonService);
  private router = inject(Router);

  id = input<string>();
  activity = linkedSignal(() => {
    let ex = EXERCISES.find(a=> a.id === this.id());
    if (ex === undefined) return Activity.unknowActivity();
    let act = this.service.findActivityByExercise(ex.id);
    if (act === undefined) return new Activity(ex.id);
    return act;
  });

  constructor() {
    addIcons({chevronForwardOutline, chevronBackOutline});
  }
  async click(activity: Activity | null) {
    if (activity == null) return;
    this.service.startSessionIfNotStarted();
    this.service.findOrStartActivityByExercise(activity.id);
    await this.router.navigate(['/app/tabs/current']);
  }

  protected readonly Activity = Activity;

  navyController = inject(NavController);
  navBack() {
    let exIndex = EXERCISES.findIndex(a=> a.id === this.id());
    if (exIndex == 0)
      return;
    let ex = EXERCISES[exIndex-1];
    this.navyController.navigateBack("exercise/" + ex.id)
  }

  navForward() {
    let exIndex = EXERCISES.findIndex(a=> a.id === this.id());
    if (exIndex === EXERCISES.length - 1)
      return;
    let ex = EXERCISES[exIndex+1];
    this.navyController.navigateForward("exercise/" + ex.id)
  }

  clickToNavigate(id: number) {
    if (id > -1) {
      void this.router.navigate(["session/"], {queryParams: {id: id}});
    }
  }

}
