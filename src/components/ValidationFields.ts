export const ValidationFields = {
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
  },
  minPassword: {
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    },
  },
  speacialCharacter: {
    pattern: {
      value: /[^a-zA-Z0-9]/,
    },
  },
  upperCaseCharacter: {
    pattern: {
      value: /[A-Z]/,
    },
  },
  lowerCaseCharacter: {
    pattern: {
      value: /[a-z]/,
    },
  },
  number: {
    pattern: {
      value: /[0-9]/,
    },
  },
  text: {
    pattern: {
      value: /^[a-zA-Z]*$/,
    },
  },
  phone: {
    pattern: {
      value: /^[0-9]*$/,
    },
  },
};
export default interface ValidationFields {
  email?: boolean;
  password?: boolean;
  text?: boolean;
  phone?: boolean;
  number?: boolean;
}
export interface ValidationPasswordOptions {
  minLength?: number;
  speacial?: boolean;
  upperCase?: boolean;
  lowerCase?: boolean;
  number?: boolean;
}
export type ValidationFieldsKeys = typeof ValidationFields;

export const isValidation = (
  validation: ValidationFieldsKeys,
  value: any,
  passwordOptions?: ValidationPasswordOptions,
) => {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  if (validation === 'email') {
    if (!ValidationFields.email.pattern.value.test(value)) {
      return false;
    }
  }
  if (validation === 'password') {
    if (passwordOptions?.lowerCase) {
      if (!ValidationFields.lowerCaseCharacter.pattern.value.test(value)) {
        return false;
      }
    }
    if (passwordOptions?.upperCase) {
      if (!ValidationFields.upperCaseCharacter.pattern.value.test(value)) {
        return false;
      }
    }
    if (passwordOptions?.number) {
      if (!ValidationFields.number.pattern.value.test(value)) {
        return false;
      }
    }
    if (passwordOptions?.speacial) {
      if (!ValidationFields.speacialCharacter.pattern.value.test(value)) {
        return false;
      }
    }
    if (passwordOptions?.minLength) {
      return value.length >= passwordOptions.minLength;
    }
  }
  if (validation === 'text') {
    if (!ValidationFields.text.pattern.value.test(value)) {
      return false;
    }
  }
  if (validation === 'phone') {
    if (!ValidationFields.phone.pattern.value.test(value)) {
      return false;
    }
  }
  if (validation === 'number') {
    if (!ValidationFields.number.pattern.value.test(value)) {
      return false;
    }
  }
  return true;
};
export const checkPasswordOptions = (
  options: ValidationPasswordOptions,
  value: string,
  inputId: string,
): {
  password?: boolean;
  lowerCase?: boolean;
  upperCase?: boolean;
  number?: boolean;
  speacial?: boolean;
  minLength?: boolean;
} => {
  let result = {};
  if (value === undefined || value.length === 0) {
    result = {
      [inputId]: true,
    };
  }
  if (options?.lowerCase) {
    if (ValidationFields.lowerCaseCharacter.pattern.value.test(value)) {
      result = {
        lowerCase: true,
      };
    }
  }
  if (options?.upperCase) {
    if (ValidationFields.upperCaseCharacter.pattern.value.test(value)) {
      result = {
        upperCase: true,
      };
    }
  }
  if (options?.number) {
    if (ValidationFields.number.pattern.value.test(value)) {
      result = {
        number: true,
      };
    }
  }
  if (options?.speacial) {
    if (ValidationFields.speacialCharacter.pattern.value.test(value)) {
      result = {
        speacial: true,
      };
    }
  }
  if (options?.minLength) {
    if (ValidationFields.minPassword.pattern.value.test(value)) {
      result = {
        minLength: true,
      };
    }
  }
  return result;
};
