import { Component, Input } from '@angular/core';

import { Drug, allDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent {
  @Input() drugs: Drug[] = [];

  allDrugs = allDrugs;
}
