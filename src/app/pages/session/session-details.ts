import {Component, inject, input, linkedSignal} from '@angular/core';
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
import {RouterLink} from '@angular/router';
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
import {PopoverPage} from './about-popover';
import {Session} from '../../classes/state.interface';
import {DatePipe} from '@angular/common';

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
export class SessionDetails {
  service = inject(CommonService);
  appState = this.service.appState;
  id = input<string>();
  session = linkedSignal(()=>{
      if (this.id()){
        let id = +(this.id()??"0");
        return this.appState().history[id];
      }
      return null;
    }
  );
  ls = inject(LocalStorageService);
  generatedLink = linkedSignal(()=>{
    const linkId = this.ls.getCompressed(this.session());
    return  linkId;
  });
  constructor() {
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
  private popoverCtrl = inject(PopoverController);
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: { link: this.generatedLink() },
      event,
    });
    await popover.present();
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
