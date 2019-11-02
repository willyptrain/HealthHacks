import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientService} from '../Services/patient.services';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./app.component.css']
})

export class PatientsComponent {


  object = Object; //used to get keys from patient object

  //Inputs:
  @Input() patientList;
  @Input() inEdit;
  @Input() currentPatient;

  //Outputs:
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private patientService: PatientService) {
    this.patientService = patientService;
  }
  ngOnInit() {
    if(this.currentPatient) {
      this.updateStyles(this.currentPatient, 0);
    }
  }

  /**
   * updateStyles
   * updates the sidelist to make selected patient appear blue
   * and others are not shaded blue.
   * @param patient
   * @param selectedIndex
   */
  updateStyles(patient, selectedIndex) {
    if(this.patientList && patient) {
      if(patient.lastName) {
        for (let character of this.object.keys(this.patientList)) {
          for (let i in this.patientList[character]) {
            this.patientList[character][i].colorBlue = false;
          }
        }
        if(this.patientList[patient.lastName.charAt(0).toLowerCase()].length > 0) {
          this.patientList[patient.lastName.charAt(0).toLowerCase()][selectedIndex].colorBlue = true;
        }
      }
    }
  }

  /**
   * sends event to app component for patient to be deleted from the database
   * @param patient
   */
  removePatient(patient) {
    this.delete.emit(patient);
  }

  /**
   * selectPatient()
   * selects the patient from the side list to be shown
   * @param patient
   * @param index
   */
  selectPatient(patient, index) {
    this.updateStyles(patient, index);
    var referenceObj = {
      'patient':patient,
      'index':index
    };
    this.select.emit(referenceObj);
  }









}





