import {Component, inject, input, linkedSignal} from '@angular/core';
import {DailySummary} from "../../components/daily-summary/daily-summary";
import {CommonService} from '../../classes/common.service';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-view',
  imports: [
    DailySummary,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton
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
}
