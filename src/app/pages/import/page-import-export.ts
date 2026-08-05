import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { CommonService } from '../../classes/common.service';
import { IndexedDbStateService } from '../../classes/indexed-db-state.service';
import { Session } from '../../classes/state.interface';
import { NativeGymMateStateService } from '../../native-gym-mate-state-service';

@Component({
  selector: 'app-page-import-export',
  imports: [FormsModule, IonAlert, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonFooter],
  templateUrl: './page-import-export.html',
  styleUrl: './page-import-export.scss',
})
export class PageImportExport implements OnInit {
  data = signal<string>('');
  service = inject(CommonService);
  db = inject(IndexedDbStateService);
  native = inject(NativeGymMateStateService);
  _snackBar = inject(MatSnackBar);

  async ngOnInit() {
    const hist = await this.db.getHistory();
    this.data.set(JSON.stringify(hist));
  }
  router = inject(Router);
  importAlertButtons = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Import', role: 'yes' },
  ];

  importConfirmation(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'yes') {
      this.import();
    }
  }

  import() {
    const val = JSON.parse(this.data()) as Session[];
    if (val) {
      this.service.setHistory(val);
    }
    this.router.navigateByUrl('/');
  }
  async save() {
    // const val = JSON.parse(this.data) as Session[];
    await this.native.save(this.data());
    this._snackBar.open('Native Save Complete.', 'Close', {
      duration: 3000,
    });
  }
  async selectAll(textarea: IonTextarea) {
    const input = await textarea.getInputElement();
    input.focus();
    input.select();
  }
  async get() {
    const state = await this.native.get();
    this.data.set(JSON.stringify(state));
    this._snackBar.open('Native Get Complete.', 'Close', {
      duration: 3000,
    });
  }
}
//rsync -av --delete "/Users/foro/Projects/angular.20.test/angular-test-20/dist/gym-mate/browser" "/Users/foro/Documents/IOS app/spa"
