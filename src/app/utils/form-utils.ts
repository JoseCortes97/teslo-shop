import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

export class FormUtils {
  // expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
        case 'email':
          return 'Formato de correo no valido';
        case 'emailTaken':
          return 'El correo ya existe';
        case 'notValidValue':
          return 'El valor no se puede usar';
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Formato de correo no valido';
          }
          if (errors['pattern'].passwordNotEqual) {
            return 'Las contraseñas no coinciden';
          }
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};
    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors || {};
    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGoup: AbstractControl) => {
      const fieldOneValue = formGoup.get(fieldOne)?.value;
      const fieldTwoValue = formGoup.get(fieldTwo)?.value;
      return fieldOneValue === fieldTwoValue ? null : { fieldNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }

    return null;
  }

  static notValidValue(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'strider') {
      return { notValidValue: true };
    }

    return null;
  }
}
