import { get } from "lodash";

export const validateData = (data: any, validationSchema: any) => {
  const errors: { [key: string]: string } = {};

  // for (const field in validationSchema) {
  //   const rules = validationSchema[field];

  //   if (rules.required && !data[field]) {
  //     errors[field] = `${field} is required`;
  //   }

  //   if (rules.minLength && data[field].length < rules.minLength) {
  //     errors[field] = `${field} must be at least ${rules.minLength} characters`;
  //   }

  //   if (rules.maxLength && data[field].length > rules.maxLength) {
  //     errors[
  //       field
  //     ] = `${field} must be no more than ${rules.maxLength} characters`;
  //   }

  //   if (rules.regex && !rules.regex.test(data[field])) {
  //     errors[field] = `${field} is invalid`;
  //   }

  //   if (rules.custom && typeof rules.custom === "function") {
  //     const customError = rules.custom(data[field]);
  //     if (customError) {
  //       errors[field] = customError;
  //     }
  //   }
  // }

  const validators = {
    required: (value) => !value && "This field is required.",
    minLength: (value, ruleValue) =>
      value.length < ruleValue && `Must be at least ${ruleValue} characters.`,
    maxLength: (value, ruleValue) =>
      value.length > ruleValue &&
      `Must be no more than ${ruleValue} characters.`,
    regex: (value, ruleValue) => !ruleValue.test(value) && "Invalid format.",
    custom: (value, ruleFunc) => ruleFunc(value),
  };

  for (const field in validationSchema) {
    const rules = validationSchema[field];
    console.log(field);

    for (const rule in rules) {
      const fieldValue = get(data, field);
      const error = validators[rule](fieldValue, rules[rule]);
      if (error) {
        errors[field] = error;
        break; // return on error at a time
      }
    }
  }

  return errors;
};
