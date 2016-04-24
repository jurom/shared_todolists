import React from 'react'
import {validityProps, nameToPlaceholder} from './helpers'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

export const createInputsFor = (site, dispatchValidation, dispatchChange, {validation, fields}) => {

  const validityForInput = validityProps(validation)

  const propsForInput = (name) => ({
    onChange: (e) => dispatchChange([[site, 'fields', name], e.target.value]),
    value: fields.get(name),
    placeholder: nameToPlaceholder[name],
    ...validityForInput(name)
  })

  const renderInput = (name, type = 'text') => {
    const {valid = null, help = null} = validityForInput(name)
    return (
      <FormGroup controlId={name} validationState={valid}>
        <FormControl
          type={type}
          {...propsForInput(name)}
        />
        <FormControl.Feedback />
        <HelpBlock>{help}</HelpBlock>
      </FormGroup>
    )
  }
  const onValidation = (name) => ({validationResult = null, showValidation = null}) => {
    let toDispatch = {}
    if (validationResult != null) toDispatch = validationResult
    if (showValidation != null) toDispatch.showValidation = showValidation
    dispatchValidation([[site, 'validation', name], {...toDispatch}])
  }

  return {renderInput, onValidation}
}
