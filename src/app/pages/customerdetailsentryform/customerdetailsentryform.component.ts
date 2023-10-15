import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customerdetailsentryform',
  templateUrl: './customerdetailsentryform.component.html',
  styleUrls: ['./customerdetailsentryform.component.scss']
})
export class CustomerdetailsentryformComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      postcode: [''],
      subscribe: [false]
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      // Handle form submission
      console.log(this.userForm.value);
    } else {
      // Form is not valid, show error messages or take appropriate action
    }
  }
}
