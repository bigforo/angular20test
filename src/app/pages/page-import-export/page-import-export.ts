import {Component, inject} from '@angular/core';
import {MatInput, MatLabel} from '@angular/material/input';
import {CommonService} from '../../classes/common.service';
import {LocalStorageService} from '../../classes/ls';
import {MatButton} from '@angular/material/button';
import {Session} from '../../classes/state.interface';

@Component({
  selector: 'app-page-import-export',
  imports: [ MatInput, MatButton ],
  templateUrl: './page-import-export.html',
  styleUrl: './page-import-export.scss'
})
export class PageImportExport {
  data: any;
  service = inject(CommonService)
  ls = inject(LocalStorageService)
  constructor() {
    this.data = JSON.stringify(this.service.appState.history);
  }

  import() {
    const val = JSON.parse(this.data) as Session[];
    if (val){
      this.service.appState.history = val;
    }
  }
}
