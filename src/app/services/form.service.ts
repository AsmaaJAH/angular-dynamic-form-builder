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
      { type: 'checkbox', label: 'Accept Terms', name: 'terms', validations: { required: true } },
      {
        type: 'group',
        label: 'Hobbies',
        name: 'hobbies',
        children: [
          { type: 'text', label: 'Hobby', name: 'hobby', placeholder: 'Enter a hobby' }
        ]
      }
    ];
  }
}
