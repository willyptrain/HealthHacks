import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PatientService {

  patients;

  /**
   * _url is the proper url for which the patients are
   * to be stored in the database
   *
   * set up using json-server REST API
   */
  private _url: string = "http://localhost:3000/patients/";

  constructor(private http: HttpClient) {}

  addPatient(patient) {
    return this.http.post(this._url,patient);
  }

  getPatients() {
    return this.http.get(this._url);
  }

  deletePatient(id) {
    return this.http.delete(this._url+id);
  }
  updatePatient(patient) {
    return this.http.put((this._url+patient.id), patient);
  }

  /**
   * sorts the names first by last name
   * if last names are the same, sort by first name
   * returns patient list to update patient component
   * @param patientList
   * @param byLastName
   */
  sortHelper(patientList, byLastName=true) {
    if(patientList.length >= 2) {
      if (byLastName) {
        patientList.sort(function(patient1, patient2) {
          if (patient1.lastName.toLowerCase() > patient2.lastName.toLowerCase()) {
            return 1;
          } else if (patient1.lastName.toLowerCase() < patient2.lastName.toLowerCase()) {
            return -1;
          } else {
            // this.sortAlphabetically(this.patients, false);
            if (patient1.firstName.toLowerCase() > patient2.firstName.toLowerCase()) {
              return 1;
            } else if (patient1.firstName.toLowerCase() < patient2.firstName.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          }
        })
      }
    }
    return patientList;
  }

  /**
   * relies on sort helper to properly sort patients
   * @param patients
   */
  sortAlphabetically(patients) {
    if(patients) {
      for (let key of Object.keys(patients)) {
        patients[key] = this.sortHelper(patients[key]);
      }
    }
    return patients;
  }


}
