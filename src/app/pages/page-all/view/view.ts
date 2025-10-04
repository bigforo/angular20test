import {Component, inject, input, linkedSignal} from '@angular/core';
import {DailySummary} from "../../../components/daily-summary/daily-summary";
import {Session} from '../../../classes/state.interface';
import {CommonService} from '../../../classes/common.service';

@Component({
  selector: 'app-view',
    imports: [
        DailySummary
    ],
  templateUrl: './view.html',
  styleUrl: './view.scss'
})
export class View {
  service = inject(CommonService);
  id = input<string>();
  session = linkedSignal(()=>{
      if (this.id()){
        let id = +(this.id()??"0");
        return this.service.appState.history[id];
      }
      return null;
    }
  );
}
