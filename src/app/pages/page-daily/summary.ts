import {Component, inject, linkedSignal} from '@angular/core';
import {CommonService} from '../../classes/common.service';
import {MatButton} from '@angular/material/button';
import {DailySummary} from '../../components/daily-summary/daily-summary';
import {LocalStorageService} from '../../classes/ls';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatChipListbox, MatChipListboxChange, MatChipOption} from '@angular/material/chips';

@Component({
  selector: 'app-summary',
  imports: [
    MatButton,
    DailySummary,
    RouterLink,
    MatChipListbox,
    MatChipOption
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService)
  router = inject(Router);

  new() {
    this.service.stopSession();
    this.service.save();
    this.router.navigate(['/']);
  }

  ls = inject(LocalStorageService);
  link = linkedSignal(()=>{
    return this.ls.getCompressed(this.service.appState.current) ?? "";
  });

  chipChange($event: MatChipListboxChange) {
    if ($event.value) {
      console.log($event.value);
    }
  }
}
