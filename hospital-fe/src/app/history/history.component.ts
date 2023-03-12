import { Component, Input } from '@angular/core';

import { Simulation } from '../app.component';
import { Quarantine } from 'hospital-lib';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() history!: Simulation;

  reportDisplayed = false;

  hideShowReport() {
    if(Object.keys(this.history.patientsAfterTreatment).length === 0) {
      const quarantine = new Quarantine(this.history.patientsBeforeTreatment);
      quarantine.setDrugs(this.history.drugs);
      quarantine.wait40Days();

      this.history.patientsAfterTreatment = quarantine.report();
    }
    this.reportDisplayed = !this.reportDisplayed;
  }
}
