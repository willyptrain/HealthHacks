import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inEdit; //used to tell if in 'edit' mode
  inCreate; //used to tell if in 'create' mode
  nonCategoryContacts; 'list of contacts, unorganized (not alphabetical)'

  //contacts object is used to hold all the contacts in alphabetical order
  //and can be easily hashed by the first letter in last name
  contacts = {
    'a': [], 'b': [], 'c': [], 'd': [],
    'e': [], 'f': [], 'g': [], 'h': [],
    'i': [], 'j': [], 'k': [], 'l': [],
    'm': [], 'n': [], 'o': [], 'p': [],
    'q': [], 'r': [], 's': [], 't': [],
    'u': [], 'v': [], 'w': [], 'x': [],
    'y': [], 'z': []
  };

  currentIndex; //index in contacts sub list of selected contact
  currentContact; //selected contact info
  index;

  //Outputs:
  @Output() edit: EventEmitter<any> = new EventEmitter();


  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }

  ngOnInit() {
    this.currentIndex = 0;
    this.inEdit = false;
    this.getContacts();

  }

  /**
   * getContacts() loads the contacts from the database
   */
  getContacts() {
    this.contactService.getContacts().subscribe(contacts => {
      if(contacts[0]) {
        if(!this.currentContact) {
          this.currentContact = contacts[0];
        }
        this.nonCategoryContacts = contacts;
        this.index += this.nonCategoryContacts.length+1;

      } else {
        this.index = 0;
        this.nonCategoryContacts = [];
        this.currentContact = null;
      }
      this.updateContactList(contacts);
    });
  }

  /**
   * deleteContact(contact) deletes the passed in contact from the database
   */
  deleteContact(contact){
    this.contactService.deleteContact(contact.id).subscribe(value => {
      this.currentContact = null;
      this.getContacts();
      this.index = this.nonCategoryContacts ? this.nonCategoryContacts.length : 1;
      this.inEdit = false;
    }, error => {
      console.log(error);
      this.inEdit = false;
    });
  }

  /**
   * update the local contact list with the contact list from the database
   * to allow the component to load the contacts
   */
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
      if(this.contacts[lastNameLetter]) {
        this.contacts[lastNameLetter].push(contacts[i]);
      }
    }
    this.contacts = this.contactService.sortAlphabetically(this.contacts);
  }

  /**
   * addContact(contact) adds passed in contact to database
   * @param contact
   */
  addContact(contact) {
    this.contactService.addContact(contact).subscribe((contact) => {
      this.getContacts();
      this.currentContact = contact;
    }, (error) => {
      console.log(error);
    })
  }


  /**
   * editContact(contact) edits the contact in the database
   * @param contact
   */
  editContact(contact) {
    this.inEdit = false;
    this.contactService.updateContact(contact).subscribe((contact) => {
      this.getContacts();
      this.currentContact = contact;
    }, (error) => {
      console.log(error);
    })
  }

  /**
   * updates the contact page view by loading selected contact and disabling
   * 'edit' and 'create' mode
   * @param refObj
   */
  updateContactView(refObj) {
    this.currentContact = refObj.contact;
    this.currentIndex = refObj.index;
    this.inCreate = false;
    this.inEdit = false;
  }


}
