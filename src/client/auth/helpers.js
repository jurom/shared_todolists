
export const validityProps = (validation) => (name) => {
  const fieldValidity = validation.get(name)
  if (!fieldValidity) return {}
  const {valid = null, showValidation = null, error = null} = fieldValidity
  if (!showValidation) return {}
  return {
    valid: valid ? 'success' : 'error',
    help: valid ? null : error
  }
}

export const formValid = (validation) =>
  validation.every(({valid = null}) => valid === true)

export const nameToPlaceholder = {
  email: 'Email',
  password: 'Password',
  firstName: 'First name',
  lastName: 'Last name',
}
