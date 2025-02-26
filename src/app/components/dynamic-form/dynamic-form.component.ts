import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,FormControl, FormArray} from '@angular/forms';
import { FormField } from '../../models/form-field.model';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig: FormField[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit() {

    this.formConfig = this.formService.getFormConfig();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({});

    // this.formConfig.forEach(field => {
    //   this.addField(field, this.form);
    // });
    this.formConfig.forEach(field => {
      if (field.type === 'group' && field.children) {
        const nestedGroup = this.fb.group({});
        field.children.forEach(child => this.addField(child, nestedGroup));
        this.form.addControl(field.name, nestedGroup);
      } else if (field.type === 'array') {
        this.form.addControl(field.name, new FormArray([]));
      }  else {
        this.form.addControl(field.name, new FormControl('', this.getValidators(field.validations)));
      }
    });
  }

  addField(field: FormField, group: FormGroup) {
    if (field.type === 'group' && field.children) {
      const nestedGroup = this.fb.group({});
      field.children.forEach(child => this.addField(child, nestedGroup));
      group.addControl(field.name, nestedGroup);
    } else if (field.type === 'array') {
      group.addControl(field.name, this.fb.array([])); // Initialize as FormArray
    } else {
      const control = this.fb.control(
        field.value || '',  // Default value
        this.getValidators(field.validations) // Apply validators
      );
      group.addControl(field.name, control);
    }
  }
 // Get FormArray for repeatable fields
 getFormArray(fieldName: string): FormArray {
  return this.form.get(fieldName) as FormArray;
}

addArrayItem(fieldName: string) {
  const formArray = this.getFormArray(fieldName);
  formArray.push(new FormControl('')); // Adding a new empty input field
}

removeArrayItem(fieldName: string, index: number) {
  const formArray = this.getFormArray(fieldName);
  if (formArray.length > 0) {
    formArray.removeAt(index);
  }
}

  getValidators(validations?: any) {
    const validatorList = [];
    if (validations?.required) validatorList.push(Validators.required);
    if (validations?.minLength) validatorList.push(Validators.minLength(validations.minLength));
    if (validations?.maxLength) validatorList.push(Validators.maxLength(validations.maxLength));
    if (validations?.pattern) validatorList.push(Validators.pattern(validations.pattern));
    return validatorList;
  }
  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Enter a valid email';
    if (control.hasError('minlength')) return 'Too short';

    return 'Invalid input';
  }
  isEmpty(obj: any): boolean {
    return obj && Object.keys(obj).length === 0;
  }
  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted successfully!');
    }
  }
}

