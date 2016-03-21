
export const validityProps = (validation) => (name) => {
  const fieldValidity = validation.get(name)
  if (!fieldValidity) return {}
  const {valid, showValidation, error} = fieldValidity
  if (!showValidation) return {}
  return {
    hasFeedback: true,
    bsStyle: valid ? 'success' : 'error',
    help: valid ? null : error
  }
}

export const nameToPlaceholder = {
  email: 'Email',
  password: 'Password',
  firstName: 'First name',
  lastName: 'Last name',
}
