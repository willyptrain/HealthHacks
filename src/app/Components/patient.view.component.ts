
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientService} from '../Services/patient.services';


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient.view.component.html',
  styleUrls: ['./app.component.css']
})

export class PatientViewComponent {

  //input fields:
  email = "";
  phone = "";
  address = "";
  notes = "";
  firstName = "";
  lastName = "";

  //inputs:
  @Input() index;
  @Input() patientList;
  @Input() inCreate: boolean;
  @Input() selectedPatient;
  @Input() inEdit: boolean;

  //outputs:
  @Output() addPatient: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() editMode: EventEmitter<any> = new EventEmitter<any>();

  constructor(private patientService: PatientService) {
    this.patientService = patientService;
  }

  ngOnInit() {
    this.inEdit = false;
    this.inCreate = false;
  }

  /**
   * toggles 'edit' mode
   */
  toggleEditPage() {
    this.inEdit = !this.inEdit;
    this.editMode.emit(this.inEdit);
  }

  /**
   * uploadPatient()
   * ensures first and last name are properly formatted
   * emits event for app component to update database with new patient
   */
  uploadPatient() {
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Improper formatting of name fields!.");
    }
    else {
      const newPatient = {
        "id": this.index,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "address": this.address,
        "phone": this.phone,
        "email": this.email,
        "notes": this.notes
      };
      this.inCreate = false;
      this.addPatient.emit(newPatient);
      this.firstName = "";
      this.lastName = "";
      this.address = "";
      this.phone = "";
      this.email = "";
      this.notes = "";
    }
  }

  /**
   * cancel()
   * disables 'create' and 'edit' mode
   * sets input fields to ""
   */
  cancel() {
    this.inEdit = false;
    this.inCreate = false;
    this.firstName = "";
    this.lastName = "";
    this.address = "";
    this.phone = "";
    this.email = "";
    this.notes = "";
  }

  /**
   * grabs the patient information from the input and emits
   * event for app component to send patient to database
   */
  updatePatient() {
    this.inEdit = false;
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Improper formatting of name fields");
    } else {
      const tempPatient = {
        "id": this.selectedPatient.id,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "address": this.address,
        "phone": this.phone,
        "email": this.email,
        "notes": this.notes
      };
      this.edit.emit(tempPatient);
      this.firstName = "";
      this.lastName = "";
      this.address = "";
      this.phone = "";
      this.email = "";
      this.notes = "";
    }
  }


  createPatient() {
    this.inCreate = true;
  }


}
