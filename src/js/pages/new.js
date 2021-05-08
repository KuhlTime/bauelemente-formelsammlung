import $ from 'jquery'
import joi from 'joi'

import db from '../config/firebase'
import switchPage from '../switch-page'

// Elements
const $cancleBtn = $('#cancleBtn')
const $saveBtn = $('#saveBtn')

// Events
$cancleBtn.on('click', () => {
  clearAll()
  switchPage('home')
})

$saveBtn.on('click', () => {
  const validationResult = validate()

  if (validationResult.error) {
    console.warn(validationResult.error.message)
    return
  }

  db.collection('symbols')
    .add(validationResult.value)
    .then(() => {
      switchPage('home')
      clearAll()
    })
})

$('[id^=input-]').on('keyup', () => {
  validate()
})

$('#input-isConstant').on('click', () => {
  validate()
})

// Functions
function clearAll() {
  $('[id^=input-]').val('')
  $('#input-isConstant').val(false)
}

/**
 * 
 * @returns 
 */
function validate() {
  var data = {
    symbol: $('#input-symbol').val(),
    name: $('#input-name').val(),
    unit: $('#input-unit').val(),
    description: $('#input-description').val(),
    isConstant: $('#input-isConstant').is(':checked'),
    value: $('#input-value').val()
  }

  const schema = joi
    .object({
      symbol: joi.string().required(),
      name: joi.string().required(),
      unit: joi.string().required(),
      isConstant: joi.boolean().required(),
      value: joi.string().when('isConstant', { is: true, then: joi.required(), otherwise: '' })
    })
    .unknown()

  const validationResult = schema.validate(data)

  if (validationResult.error) {
    $saveBtn.prop('disabled', true)
  } else {
    $saveBtn.prop('disabled', false)
  }

  return validationResult
}
