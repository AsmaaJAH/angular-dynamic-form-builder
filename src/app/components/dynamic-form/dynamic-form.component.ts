import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../../models/form-field.model';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

    this.formConfig.forEach(field => this.addField(field, this.form));
  }

  addField(field: FormField, group: FormGroup) {
    if (field.type === 'group' && field.children) {
      const nestedGroup = this.fb.group({});
      field.children.forEach(child => this.addField(child, nestedGroup));
      group.addControl(field.name, nestedGroup);
    } else {
      const control = this.fb.control(field.value || '', this.getValidators(field.validations));
      group.addControl(field.name, control);
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

  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted successfully!');
    }
  }
}

