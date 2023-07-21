import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Injectable({ providedIn: 'root' })
export class FormValidationsService {

  constructor(private translate: TranslateService) { }

  translation: string;

  getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {

    this.translate.get(fieldName).subscribe((translated: string) => {

      this.translation = translated;

    });

    const config = {
      'required': this.translation,
      'minlength': this.translation.replace('{0}', validatorValue.requiredLength),  //`${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': this.translation.replace('{0}', validatorValue.requiredLength),  // `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      "email": this.translation.replace("{0}", validatorValue.email),
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido',
      'number': this.translation.replace('{0}', validatorValue.requiredLength),
      "checkPasswords": this.translation.replace('{0}', validatorValue.checkPasswords)
    };

    return config[validatorName];
  }

  getMsg(fieldName: string) {

    this.translate.get(fieldName).subscribe((translated: string) => {

      this.translation = translated;

    });

    return this.translation

  }

}
