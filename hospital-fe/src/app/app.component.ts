import { Component, OnInit, ViewChild } from '@angular/core';

import { GetService } from './services/get.service';

import { Drug,PatientsRegister,allStates,State } from 'hospital-lib';

import { environment } from '../environments/environment';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { interval } from 'rxjs';

export interface Simulation {
  drugs: Drug[];
  patients: Array<State>;
  patientsBeforeTreatment: PatientsRegister;
  patientsAfterTreatment: PatientsRegister;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fullHistory: Array<Simulation> = [];

  @ViewChild('autoRefreshActive', { static: false })
  autoRefreshActive: MatSlideToggle = {} as MatSlideToggle;

  constructor(private service:GetService) {
  }

  ngOnInit() {
    this.autoRefresh();
  }

  getPatientsAndDrugs() {
    this.service.getDrugs()
      .subscribe(response => {
        let drugs: Drug[] = response.toString().split(',').map((key) => key as Drug);

        this.service.getPatients()
        .subscribe(response => {
          let patients = response.toString().split(',').map((key) => key as State);
          let patientsBeforeTreatment: PatientsRegister = {} as PatientsRegister;
          let patientsAfterTreatment: PatientsRegister = {} as PatientsRegister

          for(let state in allStates) {
            let stateName = state as State;
            patientsBeforeTreatment[stateName] = 0 as number;
          }
          for (let patient in patients) {
            patientsBeforeTreatment[patients[patient]]++;
          }

          if(this.fullHistory.length >= environment.historyMaxSize) {
            this.fullHistory.pop();
          }

          this.fullHistory.unshift({
            'drugs'                  : drugs,
            'patients'               : patients,
            'patientsBeforeTreatment': patientsBeforeTreatment,
            'patientsAfterTreatment' : patientsAfterTreatment
          });
        });
    });
  }

  autoRefresh() {
    interval(environment.refreshInterval).subscribe(() => {
      if(environment.refreshInterval > 0 && this.autoRefreshActive.checked) {
        this.getPatientsAndDrugs();
      }
    });
  }
}
