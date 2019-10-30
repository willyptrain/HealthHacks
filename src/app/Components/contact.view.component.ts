
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactService} from '../Services/contact.services';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact.view.component.html',
  styleUrls: ['./app.component.css']
})

export class ContactViewComponent {

  @Input() selectedContact;
  @Input() inEdit: boolean;
  email = "";
  phone = "";
  address = "";
  notes = "";
  firstName = "";
  lastName = "";
  @Input() index;
  @Input() contactList;
  @Input() inCreate: boolean;
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

  toggleEditPage() {
    this.inEdit = !this.inEdit;
    this.editMode.emit(this.inEdit);
  }

  uploadContact() {
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Names cannot begin with a number.");
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

  updateContact() {
    this.inEdit = false;
    if(!this.firstName || !this.lastName) {
      alert("Please fill out both name fields");
    } else if(!this.firstName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g) || !this.lastName.match(/^[A-Za-z][A-Za-z0-9 -]*$/g)) {
      alert("Names cannot begin with a number.");
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
