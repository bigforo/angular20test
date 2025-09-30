import {Component, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CommonService} from '../../classes/common.service';

@Component({
  selector: 'app-summary',
    imports: [
        DatePipe,
        RouterLink
    ],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  service = inject(CommonService);
}
