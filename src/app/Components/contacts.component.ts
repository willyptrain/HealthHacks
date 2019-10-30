import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactsComponent {

  @Input() contactList;
  @Input() inEdit;
  @Input() currentContact;
  object = Object;
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

  removeContact(contact) {
    this.delete.emit(contact);
  }

  selectContact(contact, index) {
    this.updateStyles(contact, index);
    var referenceObj = {
      'contact':contact,
      'index':index
    };
    this.select.emit(referenceObj);
  }









}





