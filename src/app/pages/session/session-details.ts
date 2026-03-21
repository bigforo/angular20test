import { DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, linkedSignal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, calendarNumberOutline, cloudDownload, ellipsisHorizontal, ellipsisVertical, share, shareOutline, star, starOutline } from 'ionicons/icons';
import { filter } from 'rxjs';
import { CommonService } from '../../classes/common.service';
import { LocalStorageService } from '../../classes/ls';
import { Activity, Session } from '../../classes/state.interface';
import { WorkoutDetails } from '../../components/workout-details/workout-details';

@Component({
  selector: 'app-view',
  imports: [IonButtons, IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonIcon, RouterLink, WorkoutDetails, IonFooter, IonBackButton],
  providers: [DatePipe],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SessionDetails implements OnInit {
  service = inject(CommonService);
  router = inject(Router);
  appState = this.service.appState;
  id = input<number>();
  session = linkedSignal(() => {
    const id = this.id();
    return this.appState().history[id ?? 0];
  });
  ls = inject(LocalStorageService);
  generatedLink = linkedSignal(() => {
    return this.ls.getCompressed(this.session());
  });
  ngOnInit(): void {}
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
        filter((event) => event.url.includes('/session?'))
      )
      .subscribe((event: NavigationEnd) => {
        this.service.load();
      });
    addIcons({
      shareOutline,
      starOutline,
      star,
      cloudDownload,
      share,
      ellipsisHorizontal,
      ellipsisVertical,
      arrowBackOutline,
      calendarNumberOutline,
    });
  }

  public copy() {
    if (this.session()) this.service.createOrUpdateActiveSessionBasedOnOldSession(this.session() ?? new Session('aaa'));
  }

  datepipe = inject(DatePipe);

  public getDateStart(date: Date) {
    const sessionStartDate1 = new Date(date);
    return this.datepipe.transform(sessionStartDate1, 'yyyy-MM-dd');
  }
  public getDateEnd(date: Date, addMinutes = 0) {
    const sessionStartDate1 = new Date(date);
    sessionStartDate1.setMinutes(sessionStartDate1.getMinutes() + addMinutes);
    return this.datepipe.transform(sessionStartDate1, 'yyyy-MM-dd');
  }
  public getTimeStart(date: Date) {
    const sessionStartDate1 = new Date(date);
    return this.datepipe.transform(sessionStartDate1, 'HH:mm:ss');
  }
  public getTimeEnd(date: Date, addMinutes = 0) {
    const sessionStartDate1 = new Date(date);
    sessionStartDate1.setMinutes(sessionStartDate1.getMinutes() + addMinutes);
    return this.datepipe.transform(sessionStartDate1, 'HH:mm:ss');
  }
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public getCalDesc() {
    const exercises = this.session().activities;
    let desc = '';
    if (this.session().type) desc += '[strong][u]' + this.session().type?.toUpperCase() + ' SESSION[/u][/strong]';
    else desc += '[strong][u]GYM SESSION[/u][/strong]';

    exercises?.forEach((activity) => {
      const exercise = Activity.exerciseById(activity.id);
      desc += '[p]';
      desc += '[strong]' + exercise?.name?.toUpperCase() + '[/strong] \r';
      desc += '[ol]';
      activity.sets.forEach((set) => {
        if (set.size) desc += '[li]' + set.reps + ' x ' + set.size + ' kg [/li]';
        else desc += '[li]' + set.reps + '[/li]';
      });
      desc += '[/ol]';
      if (activity.note) desc += '[p] - ' + activity.note.toLowerCase() + '[/p]';
      desc += '[/p]';
      desc += '[hr]';
    });
    if (this.session().note) desc += '[p]NOTE: ' + this.session().note?.toLowerCase() + '[/p][br]';
    desc += '[p][url]https://gym.foro.mk/view?id=' + this.generatedLink() + '|View in Gym Mate![/url][/p]';
    return desc;
  }
  public getCalName() {
    if (this.session().type) return this.session().type?.toUpperCase() + ' SESSION';
    else return 'GYM SESSION';
  }
}
