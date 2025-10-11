import {Component, inject, input, linkedSignal} from '@angular/core';
import {DailySummary} from "../../components/daily-summary/daily-summary";
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from '@angular/router';
import {LocalStorageService} from '../../classes/ls';
import {addIcons} from 'ionicons';
import {cloudDownload, share, shareOutline, star, starOutline} from 'ionicons/icons';

@Component({
  selector: 'app-view',
  imports: [
    DailySummary,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButton,
    IonIcon,
    RouterLink
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
    console.log("generated Id",linkId);
    return  linkId;
  });
  constructor() {
    addIcons({ shareOutline, starOutline, star, cloudDownload, share });
  }

}
