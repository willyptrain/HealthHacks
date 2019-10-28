
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact.view.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactViewComponent {

  @Input() selectedContact;
  inEdit: boolean;
  inCreate: boolean;
  email = "";
  phone = "";
  address = "";
  notes = "";
  firstName = "";
  lastName = "";
  @Input() contactList;
  @Input() currentContact;
  @Output() addContact: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactService: ContactService) {
    // this.contactService = contactService;
  }

  ngOnInit() {
    this.inEdit = false;
    this.inCreate = false;
  }

  toggleEditPage() {
    this.inEdit = !this.inEdit;
    this.edit.emit(this.inEdit);
  }

  uploadContact() {
    const newContact = {
      "id":this.contactList.length+1,
      "firstName": this.firstName ? this.firstName : "FirstName",
      "lastName": this.lastName ? this.lastName : "LastName",
      "phone": this.phone,
      "email": this.email,
      "notes": this.notes
    };
    this.inCreate = false;
    this.addContact.emit(newContact);
  }

  updateContact() {
    this.inEdit = false;
    let index = 0;
    const tempContact = {
      "id":this.contactList.length+1,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "phone": this.phone,
      "email": this.email,
      "notes": this.notes
    };
    var event = {
      "contact":tempContact,
      "index":index
    };


    this.edit.emit(false);
  }


  createContact() {
    this.inCreate = true;
  }


}
