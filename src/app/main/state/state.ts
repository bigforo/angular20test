import {Component, inject} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-state',
    imports: [
        JsonPipe
    ],
  templateUrl: './state.html',
  styleUrl: './state.scss'
})
export class State {
  service = inject(CommonService);
}
