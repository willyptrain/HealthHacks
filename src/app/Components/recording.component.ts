
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientService} from '../Services/patient.services';
import {ActivatedRoute, Route, Router} from '@angular/router';


@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./app.component.css']
})

export class RecordingComponent {

  //grab id from browser
  id;
  patient;
  patientService;

  constructor(private route: ActivatedRoute, patientService: PatientService) {
    this.route = route;
    this.patientService = patientService;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.patientService.getPatient(this.id).subscribe((patient) => {
        this.updatePatient(patient);
      })
    }
  }

  updatePatient(patient) {
    this.patient = patient;
  }

  start() {
    if(this.patient) {

    }
  }



}
