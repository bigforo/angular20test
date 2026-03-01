import {Component, inject} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {Session} from '../../classes/state.interface';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonTextarea, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-import-export',
  imports: [FormsModule, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonFooter],
  templateUrl: './page-import-export.html',
  styleUrl: './page-import-export.scss'
})
export class PageImportExport {
  data: any;
  service = inject(CommonService);
  appState = this.service.appState;
  ls = inject(LocalStorageService)
  constructor() {
    this.data = JSON.stringify(this.appState().history);
  }
  router = inject(Router);
  import() {
    const val = JSON.parse(this.data) as Session[];
    if (val){
      this.service.setHistory(val);
    }
    this.router.navigateByUrl('/');
  }

}
