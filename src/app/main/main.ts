import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Common } from '../classes/common';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterLink, JsonPipe],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Main {
  service = inject(Common);

}
