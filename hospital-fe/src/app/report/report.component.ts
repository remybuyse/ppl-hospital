import { Component, Input } from '@angular/core';

import { PatientsRegister, allStates } from 'hospital-lib';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  @Input() report!: PatientsRegister;

  allStates = allStates as { [key: string]: string };
}
