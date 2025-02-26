export interface FormField {
  type: string; // text, email, password, select, checkbox
  label: string;
  name: string;
  placeholder?: string;
  value?: any;
  options?: { key: string, value: string }[];
  validations?: { required?: boolean, minLength?: number, maxLength?: number, pattern?: string };
  children?: FormField[]; // For nested groups
}
