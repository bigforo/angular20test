import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {DailySummary} from "../../components/daily-summary/daily-summary";
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFabButton, IonFooter,
  IonHeader, IonIcon, IonItem, IonItemOption, IonLabel,
  IonTitle,
  IonToolbar, PopoverController
} from '@ionic/angular/standalone';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {LocalStorageService} from '../../classes/ls';
import {addIcons} from 'ionicons';
import {
  arrowBack, arrowBackOutline,
  cloudDownload,
  copy,
  ellipsisHorizontal,
  ellipsisVertical,
  share,
  shareOutline,
  star,
  starOutline
} from 'ionicons/icons';
import {WorkoutDetails} from "../../components/workout-details/workout-details";
import {PopoverPage} from '../sessions/about-popover';
import {Session} from '../../classes/state.interface';
import {DatePipe} from '@angular/common';
import {filter, take} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view',
  imports: [
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButton,
    IonIcon,
    RouterLink,
    WorkoutDetails,
    IonFooter,
    IonFabButton,
    DatePipe,
    IonItem,
    IonLabel,
    IonItemOption
  ],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss'
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
    });
  }

  public copy(){
    if(this.session())
        this.service.createOrUpdateActiveSessionBasedOnOldSession(this.session()?? new Session("aaa"));
  }



  shareLink() {

    const currentUrl = new URL(window.location.href);
    currentUrl.pathname = '/view';
    currentUrl.searchParams.set('id', this.generatedLink()??"");
    const shareUrl = currentUrl.toString();

    const shareData = {
      title: 'Gym Mate',
      text: 'Check my workout!',
      url: shareUrl,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Link shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // fallback: copy link to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }
}
