import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  form: FormGroup;
  shoes: Shoes[] = [
    {value: 'boots', name: 'Boots'},
    {value: 'clogs', name: 'Clogs'},
    {value: 'loafers', name: 'Loafers'},
    {value: 'moccasins', name: 'Moccasins'},
    {value: 'sneakers', name: 'Sneakers'},
  ];
  shoesControl = new FormControl();

  constructor() {
    this.form = new FormGroup({
      clothes: this.shoesControl,
    });
  }
  sets= [1,1,1];
  clickPlus() {
    this.sets.push(1)
  }

  clickMinus() {
    this.sets.pop();
  }
}

interface Shoes {
  value: string;
  name: string;
}
