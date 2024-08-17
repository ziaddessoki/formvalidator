import _ from 'lodash';
/* Global Validator */
export function validationCheck(data: any, validations: any) {
  const results: { [key: string]: any } = {};

  Object.keys(validations).forEach((key: any) => {
    const value = _.get(data, key);
    console.log(value);
    const { valid, errors } = validations[key].validation(value);
    results[key] = { valid, errors };
  });
  return results;
}

/* Group of Function that handle the validation*/
export function fieldRequired(value: string) {
  const valid = value.trim() !== '';
  return {
    valid,
    errors: valid ? '' : 'This field must not be bank',
  };
}

export function lowercased(value: string) {
  const valid = value === value.toLowerCase();
  return {
    valid,
    errors: valid ? '' : 'Field must be lowercased',
  };
}
