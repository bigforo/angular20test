import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {CommonService} from './classes/common.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, RouterLink,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'gym.foro.mk';
  service = inject(CommonService);
  ngOnInit() {
    this.service.load();
  }
}
