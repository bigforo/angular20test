import {Component, inject, linkedSignal, OnInit, signal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {AllSummary} from '../../components/all-summary/all-summary';
import {Activity, Session} from '../../classes/state.interface';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem, IonItemDivider,
  IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton, IonNote, IonText,
  IonTitle,
  IonToolbar, PopoverController
} from '@ionic/angular/standalone';
import {DatePipe} from '@angular/common';
import {AlertController} from '@ionic/angular';
import type {OverlayEventDetail} from '@ionic/core';
import {PopoverPage} from './about-popover';
import {addIcons} from 'ionicons';
import {
  arrowBackOutline,
  cloudDownload,
  ellipsisHorizontal,
  ellipsisVertical,
  share,
  shareOutline,
  star,
  starOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-state',
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    DatePipe,
    RouterLink,
    IonLabel,
    IonItemSliding,
    IonItem,
    IonList,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonAlert,
    IonItemDivider,
    IonButton,
    IonIcon
  ],
  providers: [DatePipe],
  templateUrl: './sessions-list.html',
  styleUrl: './sessions-list.scss'
})
export class SessionsList implements OnInit {
  service = inject(CommonService);
  appState = this.service.appState;
  router = inject(Router);
  datepipe = inject(DatePipe);

  ngOnInit(): void {
    this.service.load();
  }
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

  alertDelete = signal<Session | null> (null);
  async delete(session: Session, sliding: IonItemSliding) {

    await sliding.close();
    this.alertDelete.set(session);
  }

  deleteConfirmation(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'yes') {
      if (this.alertDelete() != null) {
        this.service.deleteSessionFromHis(this.alertDelete() as Session);
      }
      this.alertDelete.set(null);
    }
    if (event.detail.role === 'no') {
      this.alertDelete.set(null);
    }
  }


  protected readonly Activity = Activity;

  async edit($index: number, sliding: IonItemSliding) {
    await sliding.close();
    await this.router.navigate(['/session-edit'],{queryParams:{id: $index}});
  }

  diff(d1: Date, d2: Date | null) {
    const one =+(this.datepipe.transform(d1, 'w') as string);
    const two =+(this.datepipe.transform(d2, 'w') as string);
    return  (two - one) != 0;
  }

  private popoverCtrl = inject(PopoverController);
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      // componentProps: { link: this.generatedLink() },
      event,
    });
    await popover.present();
  }
}
