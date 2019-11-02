import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PatientService} from '../Services/patient.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inEdit; //used to tell if in 'edit' mode
  inCreate; //used to tell if in 'create' mode
  nonCategoryPatients; 'list of patients, unorganized (not alphabetical)'

  //patients object is used to hold all the patients in alphabetical order
  //and can be easily hashed by the first letter in last name
  patients = {
    'a': [], 'b': [], 'c': [], 'd': [],
    'e': [], 'f': [], 'g': [], 'h': [],
    'i': [], 'j': [], 'k': [], 'l': [],
    'm': [], 'n': [], 'o': [], 'p': [],
    'q': [], 'r': [], 's': [], 't': [],
    'u': [], 'v': [], 'w': [], 'x': [],
    'y': [], 'z': []
  };

  currentIndex; //index in patients sub list of selected patient
  currentPatient; //selected patient info
  index;

  //Outputs:
  @Output() edit: EventEmitter<any> = new EventEmitter();


  constructor(private patientService: PatientService) {
    this.patientService = patientService;
  }

  ngOnInit() {
    this.currentIndex = 0;
    this.inEdit = false;
    this.getPatients();

  }

  /**
   * getPatients() loads the patients from the database
   */
  getPatients() {
    this.patientService.getPatients().subscribe(patients => {
      if(patients[0]) {
        if(!this.currentPatient) {
          this.currentPatient = patients[0];
        }
        this.nonCategoryPatients = patients;
        this.index += this.nonCategoryPatients.length+1;

      } else {
        this.index = 0;
        this.nonCategoryPatients = [];
        this.currentPatient = null;
      }
      this.updatePatientList(patients);
    });
  }

  /**
   * deletePatient(patient) deletes the passed in patient from the database
   */
  deletePatient(patient){
    this.patientService.deletePatient(patient.id).subscribe(value => {
      this.currentPatient = null;
      this.getPatients();
      this.index = this.nonCategoryPatients ? this.nonCategoryPatients.length : 1;
      this.inEdit = false;
    }, error => {
      console.log(error);
      this.inEdit = false;
    });
  }

  /**
   * update the local patient list with the patient list from the database
   * to allow the component to load the patients
   */
  updatePatientList(patients) {
    this.patients = {
      'a': [], 'b': [], 'c': [], 'd': [],
      'e': [], 'f': [], 'g': [], 'h': [],
      'i': [], 'j': [], 'k': [], 'l': [],
      'm': [], 'n': [], 'o': [], 'p': [],
      'q': [], 'r': [], 's': [], 't': [],
      'u': [], 'v': [], 'w': [], 'x': [],
      'y': [], 'z': []
    };
    for (var i = 0; i < patients.length; i++) {
      var lastNameLetter = patients[i].lastName.charAt(0).toLowerCase();
      if(this.patients[lastNameLetter]) {
        this.patients[lastNameLetter].push(patients[i]);
      }
    }
    this.patients = this.patientService.sortAlphabetically(this.patients);
  }

  /**
   * addPatient(patient) adds passed in patient to database
   * @param patient
   */
  addPatient(patient) {
    this.patientService.addPatient(patient).subscribe((patient) => {
      this.getPatients();
      this.currentPatient = patient;
    }, (error) => {
      console.log(error);
    })
  }


  /**
   * editPatient(patient) edits the patient in the database
   * @param patient
   */
  editPatient(patient) {
    this.inEdit = false;
    this.patientService.updatePatient(patient).subscribe((patient) => {
      this.getPatients();
      this.currentPatient = patient;
    }, (error) => {
      console.log(error);
    })
  }

  /**
   * updates the patient page view by loading selected patient and disabling
   * 'edit' and 'create' mode
   * @param refObj
   */
  updatePatientView(refObj) {
    this.currentPatient = refObj.patient;
    this.currentIndex = refObj.index;
    this.inCreate = false;
    this.inEdit = false;
  }


}
