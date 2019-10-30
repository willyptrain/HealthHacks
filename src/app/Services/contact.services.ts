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

  deleteContact(id) {
    return this.http.delete(this._url+id);
  }
  updateContact(contact) {
    return this.http.put((this._url+contact.id), contact);
  }

  sortHelper(contactList, byLastName=true) {
    if(contactList.length >= 2) {
      if (byLastName) {
        contactList.sort(function(contact1, contact2) {
          if (contact1.lastName.toLowerCase() > contact2.lastName.toLowerCase()) {
            return 1;
          } else if (contact1.lastName.toLowerCase() < contact2.lastName.toLowerCase()) {
            return -1;
          } else {
            // this.sortAlphabetically(this.contacts, false);
            if (contact1.firstName.toLowerCase() > contact2.firstName.toLowerCase()) {
              return 1;
            } else if (contact1.firstName.toLowerCase() < contact2.firstName.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          }
        })
      }
    }
    return contactList;
  }

  sortAlphabetically(contacts) {
    if(contacts) {
      for (let key of Object.keys(contacts)) {
        contacts[key] = this.sortHelper(contacts[key]);
      }
    }
    return contacts;
  }


}
