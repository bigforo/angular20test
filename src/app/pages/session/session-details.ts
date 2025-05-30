import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, linkedSignal, OnInit} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {LocalStorageService} from '../../classes/ls';
import {addIcons} from 'ionicons';
import {
  arrowBackOutline,
  calendarNumberOutline,
  cloudDownload,
  ellipsisHorizontal,
  ellipsisVertical,
  share,
  shareOutline,
  star,
  starOutline
} from 'ionicons/icons';
import {WorkoutDetails} from "../../components/workout-details/workout-details";
import {Activity, Session} from '../../classes/state.interface';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view',
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,
    RouterLink,
    WorkoutDetails,
    IonFooter,
    IonBackButton,
  ],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SessionDetails implements OnInit{
  service = inject(CommonService);
  router = inject(Router);
  appState = this.service.appState;
  id = input<number>();
  session = linkedSignal(()=>{
      let id = this.id();
      return this.appState().history[id??0];
    }
  );
  ls = inject(LocalStorageService);
  generatedLink = linkedSignal(()=>{
    return  this.ls.getCompressed(this.session());
  });
  ngOnInit(): void {


  }
  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),takeUntilDestroyed(),
        filter(event => event.url.includes('/session?')),
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

  public copy(){
    if(this.session())
        this.service.createOrUpdateActiveSessionBasedOnOldSession(this.session()?? new Session("aaa"));
  }



  // shareLink() {
  //
  //   const currentUrl = new URL(window.location.href);
  //   currentUrl.pathname = '/view';
  //   currentUrl.searchParams.set('id', this.generatedLink()??"");
  //   const shareUrl = currentUrl.toString();
  //
  //   const shareData = {
  //     title: 'Gym Mate',
  //     text: 'Check my workout!',
  //     url: shareUrl,
  //   };
  //
  //   if (navigator.share) {
  //     navigator.share(shareData)
  //       .then(() => console.log('Link shared successfully'))
  //       .catch((error) => console.error('Error sharing:', error));
  //   } else {
  //     // fallback: copy link to clipboard
  //     navigator.clipboard.writeText(shareData.url).then(() => {
  //       alert('Link copied to clipboard!');
  //     });
  //   }
  // }

  formatTimeHHMMSS(date: Date): string {
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
  public getDate(){
    const sessionStartDate = new Date (this.session().created);
    return sessionStartDate.toISOString().split('T')[0];
  }
  public getTime(){
    const sessionStartDate = new Date (this.session().created);
    return this.formatTimeHHMMSS(sessionStartDate);
  }
  public getTimeLater(){
    const sessionStartDate = new Date (this.session().created);
    return this.formatTimeHHMMSS(this.addMinutes(sessionStartDate, 60));
  }
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  public getCalDesc() {
    let exercises = this.session().activities;
    let desc:string = "";
    if (this.session().type)
      desc += '[strong][u]' + this.session().type?.toUpperCase() +' SESSION[/u][/strong]'
    else
      desc += '[strong][u]GYM SESSION[/u][/strong]'

    exercises?.forEach(activity => {
      let exercise = Activity.exerciseById(activity.id)
      desc += '[p]'
      desc += '[strong]'+exercise?.name?.toUpperCase() +'[/strong] \r'
      desc += '[ol]'
      activity.sets.forEach(set => {
        if (set.size)
          desc += '[li]' + set.reps + ' x ' + set.size + ' kg [/li]'
        else
          desc += '[li]' + set.reps + '[/li]'
      })
      desc += '[/ol]'
      if (activity.note)
        desc += '[p] - '+activity.note.toLowerCase() +'[/p]'
      desc += '[/p]'
      desc += '[hr]'
    })
    if (this.session().note)
      desc += '[p]NOTE: '+this.session().note?.toLowerCase() +'[/p][br]'
    desc += '[p][url]https://gym.foro.mk/view?id='+this.generatedLink()+'|View in Gym Mate![/url][/p]'
    return desc;
  }
  public getCalName() {
    if (this.session().type)
      return this.session().type?.toUpperCase() +' SESSION'
    else
      return 'GYM SESSION'
  }
}
