import { Injectable } from '@angular/core';
import { FormField } from '../models/form-field.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  getFormConfig(): FormField[] {
    return [
      { type: 'text', label: 'Full Name', name: 'fullName', placeholder: 'Enter full name', validations: { required: true } },
      { type: 'email', label: 'Email', name: 'email', placeholder: 'Enter email', validations: { required: true, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' } },
      { type: 'password', label: 'Password', name: 'password', placeholder: 'Enter password', validations: { required: true, minLength: 6 } },
      { type: 'select', label: 'Gender', name: 'gender', options: [ { key: 'M', value: 'Male' }, { key: 'F', value: 'Female' } ] },
      {
        type: 'group',
        label: 'Address',
        name: 'address',
        children: [
          { type: 'text', label: 'Street', name: 'street', placeholder: 'Enter street' },
          { type: 'text', label: 'City', name: 'city', placeholder: 'Enter city' }
        ]
      },
      { type: 'array', label: 'Hobbies', name: 'hobbies' },
      { type: 'checkbox', label: 'Accept Terms', name: 'terms', validations: { required: true } },

    ];
  }
}
