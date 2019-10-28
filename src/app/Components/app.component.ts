import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  test = {
    'firstName': 'Steve',
    'lastName': 'Jobs',
    'phone': '111-222-1234',
    'email': '1234steve@gmail.com',
    'notes': ''
  };
  test2 = {
    'firstName': 'Bon',
    'lastName': 'Apple',
    'phone': '111-222-1234',
    'email': '1234bon@gmail.com',
    'notes': ''
  };
  inEdit;
  nonCategoryContacts;
  contacts = {
    'a': [], 'b': [], 'c': [], 'd': [],
    'e': [], 'f': [], 'g': [], 'h': [],
    'i': [], 'j': [], 'k': [], 'l': [],
    'm': [], 'n': [], 'o': [], 'p': [],
    'q': [], 'r': [], 's': [], 't': [],
    'u': [], 'v': [], 'w': [], 'x': [],
    'y': [], 'z': []
  };

  currentIndex;
  currentContact;
  @Output() edit: EventEmitter<any> = new EventEmitter();


  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }

  ngOnInit() {
    this.currentContact = this.test;
    this.currentIndex = 0;
    this.inEdit = false;
    this.getContacts();

  }
  getContacts() {
    this.contactService.getContacts().subscribe(contacts => {
      this.updateContactList(contacts);
      this.nonCategoryContacts = contacts;
    });
  }

  updateContactList(contacts) {
    this.contacts = {
      'a': [], 'b': [], 'c': [], 'd': [],
      'e': [], 'f': [], 'g': [], 'h': [],
      'i': [], 'j': [], 'k': [], 'l': [],
      'm': [], 'n': [], 'o': [], 'p': [],
      'q': [], 'r': [], 's': [], 't': [],
      'u': [], 'v': [], 'w': [], 'x': [],
      'y': [], 'z': []
    };
    for (var i = 0; i < contacts.length; i++) {
      var lastNameLetter = contacts[i].lastName.charAt(0).toLowerCase();
      if(lastNameLetter) {
        this.contacts[lastNameLetter].push(contacts[i]);
      }
    }
    let index = 0;
    this.contactService.updateContact(this.contacts, contacts[index], index);
    this.contacts = this.contactService.sortAlphabetically(this.contacts);
  }

  addContact(contact) {
    // this.nonCategoryContacts.push(contact);
    // this.updateContactList([contact]);
    this.contactService.addContact(contact).subscribe((success) => {
      console.log("Added contact");
      this.getContacts();
    }, (error) => {
      console.log(error);
    })

  }

  deleteContact(contact) {

  }

  updateContactView(refObj) {
    this.currentContact = refObj.contact;
    this.currentIndex = refObj.index;
    //this.contactService.updateContact(this.contacts, object.contact, object.index);

  }


}
