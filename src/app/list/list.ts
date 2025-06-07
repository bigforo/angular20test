import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatListOption, MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-list',
  imports: [
    MatSelectionList,
    MatListOption,
    ReactiveFormsModule
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
}

interface Shoes {
  value: string;
  name: string;
}
