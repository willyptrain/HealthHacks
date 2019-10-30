import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactsComponent {


  object = Object; //used to get keys from contact object

  //Inputs:
  @Input() contactList;
  @Input() inEdit;
  @Input() currentContact;

  //Outputs:
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }
  ngOnInit() {
    if(this.currentContact) {
      this.updateStyles(this.currentContact, 0);
    }
  }

  /**
   * updateStyles
   * updates the sidelist to make selected contact appear blue
   * and others are not shaded blue.
   * @param contact
   * @param selectedIndex
   */
  updateStyles(contact, selectedIndex) {
    if(this.contactList && contact) {
      if(contact.lastName) {
        for (let character of this.object.keys(this.contactList)) {
          for (let i in this.contactList[character]) {
            this.contactList[character][i].colorBlue = false;
          }
        }
        if(this.contactList[contact.lastName.charAt(0).toLowerCase()].length > 0) {
          this.contactList[contact.lastName.charAt(0).toLowerCase()][selectedIndex].colorBlue = true;
        }
      }
    }
  }

  /**
   * sends event to app component for contact to be deleted from the database
   * @param contact
   */
  removeContact(contact) {
    this.delete.emit(contact);
  }

  /**
   * selectContact()
   * selects the contact from the side list to be shown
   * @param contact
   * @param index
   */
  selectContact(contact, index) {
    this.updateStyles(contact, index);
    var referenceObj = {
      'contact':contact,
      'index':index
    };
    this.select.emit(referenceObj);
  }









}





