
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact.view.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactViewComponent {

  //input fields:
  email = "";
  phone = "";
  address = "";
  notes = "";
  firstName = "";
  lastName = "";

  //inputs:
  @Input() index;
  @Input() contactList;
  @Input() inCreate: boolean;
  @Input() selectedContact;
  @Input() inEdit: boolean;

  //outputs:
  @Output() addContact: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() editMode: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactService: ContactService) {
    this.contactService = contactService;
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
   * uploadContact()
   * ensures first and last name are properly formatted
   * emits event for app component to update database with new contact
   */
  uploadContact() {
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Improper formatting of name fields!.");
    }
    else {
      const newContact = {
        "id": this.index,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "address": this.address,
        "phone": this.phone,
        "email": this.email,
        "notes": this.notes
      };
      this.inCreate = false;
      this.addContact.emit(newContact);
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
   * grabs the contact information from the input and emits
   * event for app component to send contact to database
   */
  updateContact() {
    this.inEdit = false;
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Improper formatting of name fields");
    } else {
      const tempContact = {
        "id": this.selectedContact.id,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "address": this.address,
        "phone": this.phone,
        "email": this.email,
        "notes": this.notes
      };
      this.edit.emit(tempContact);
      this.firstName = "";
      this.lastName = "";
      this.address = "";
      this.phone = "";
      this.email = "";
      this.notes = "";
    }
  }


  createContact() {
    this.inCreate = true;
  }


}
