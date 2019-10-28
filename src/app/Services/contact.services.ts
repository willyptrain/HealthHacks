import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ContactService {

  contacts;
  private _url: string = "http://localhost:3000/contacts/";

  constructor(private http: HttpClient) {}

  addContact(contact) {
    return this.http.post(this._url,contact);
  }

  getContacts() {
    return this.http.get(this._url);
  }

  deleteContact(contact) {

  }
  updateContact(contacts, contact, index) {
    this.contacts = contacts;
    let key = contact.lastName.charAt(0).toLowerCase();
    this.contacts[key][index].firstName = contact.firstName;
    this.contacts[key][index].lastName = contact.lastName;
    this.contacts[key][index].phone = contact.phone;
    this.contacts[key][index].email = contact.email;
    this.contacts[key][index].notes = contact.notes;
  }

  sortHelper(contactList, byLastName=true) {
    if(byLastName) {
      contactList.sort(function(contact1, contact2) {
        if(contact1.lastName.toLowerCase() > contact2.lastName.toLowerCase()) {
          return 1;
        } else if(contact1.lastName.toLowerCase() < contact2.lastName.toLowerCase()) {
          return -1;
        } else {
          this.sortAlphabetically(this.contacts, false);
        }
      })
    } else {
      contactList.sort(function(contact1, contact2) {
        if(contact1.firstName.toLowerCase() > contact2.firstName.toLowerCase()) {
          return 1;
        } else if(contact1.firstName.toLowerCase() < contact2.firstName.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      })
    }
    return contactList;
  }

  sortAlphabetically(contacts, byLastName=true) {
    for(let key of Object.keys(this.contacts)) {
      this.contacts[key] = this.sortHelper(this.contacts[key]);
    }
    return this.contacts;
  }


}
