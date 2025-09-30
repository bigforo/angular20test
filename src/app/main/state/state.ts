import {Component, inject} from '@angular/core';
import {DatePipe, JsonPipe} from "@angular/common";
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-state',
  imports: [
    DatePipe
  ],
  templateUrl: './state.html',
  styleUrl: './state.scss'
})
export class State {
  service = inject(CommonService);
}
