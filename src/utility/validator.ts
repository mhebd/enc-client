const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Validator {
  private value: string;
  private fieldName: string;
  private errors: string[] = [];

  constructor({ value, fieldName = "Field" }: {
    value: string;
    fieldName?: string;
  }) {
    this.value = value;
    this.fieldName = fieldName;
  }

  required() {
    if (!this.value || this.value.trim() === "") {
      this.errors.push(`${this.fieldName} is required`);
    }
    return this;
  }

  alpha() {
    if (!/^[a-zA-Z. ]+$/.test(this.value)) {
      this.errors.push(`${this.fieldName} must contain only alphabetic characters and periods`);
    }
    return this;
  }

  address() {
    if (!/^[a-zA-Z0-9-,./ ]+$/.test(this.value)) {
      this.errors.push(`${this.fieldName} must contain only alphanumeric characters, commas, dashes, slashes, and periods`);
    }
    return this;
  }

  alphaNumeric() {
    if (!/^[a-zA-Z0-9. ]+$/.test(this.value)) {
      this.errors.push(`${this.fieldName} must contain only alphanumeric characters and periods`);
    }
    return this;
  }

  numeric() {
    if (!/^\d+$/.test(this.value)) {
      this.errors.push(`${this.fieldName} must contain only numeric characters`);
    }
    return this;
  }

  minLength(min: number) {
    if (this.value.trim().length < min) {
      this.errors.push(`${this.fieldName} must be at least ${min} characters`);
    }
    return this;
  }

  min(min: number) {
    if (Number(this.value) < min) {
      this.errors.push(`${this.fieldName} must be at least ${min}`);
    }
    return this;
  }

  maxLength(max: number) {
    if (this.value.trim().length > max) {
      this.errors.push(`${this.fieldName} must be at most ${max} characters`);
    }
    return this;
  }

  max(max: number) {
    if (Number(this.value) > max) {
      this.errors.push(`${this.fieldName} must be at most ${max}`);
    }
    return this;
  }

  email() {
    if (!emailRegex.test(this.value)) {
      this.errors.push(`${this.fieldName} must be a valid email address`);
    }
    return this;
  }

  phone() {
    if (!/^\d{10}$/.test(this.value)) {
      this.errors.push(`${this.fieldName} must be a valid phone number`);
    }
    return this;
  }

  equals(otherValue: string, otherFieldName?: string) {
    if (this.value !== otherValue) {
      this.errors.push(`${this.fieldName} and ${otherFieldName || "other field"} must be equal`);
    }
    return this;
  }

  validate() {
    if (this.errors.length > 0) {
      return this.errors.join(", ");
    }
    return "";
  }
}

export const validator = (value: string, fieldName?: string) => {
  return new Validator({ value, fieldName });
};
