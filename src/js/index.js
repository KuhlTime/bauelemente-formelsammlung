import db from './config/firebase'
import $ from 'jquery'
import katex from 'katex'
import joi from 'joi'

import switchPage from './switch-page'

const $tbody = $('tbody')
const $newSymbolBtn = $('#newSymbol')
const $cancleBtn = $('#cancleBtn')
const $saveBtn = $('#saveBtn')

function clearAll() {
  $('[id^=input-]').val('')
  $('#input-isConstant').val(false)
}

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

$newSymbolBtn.on('click', () => {
  switchPage('new-symbol')
})

var symbols = []

function updateUI() {
  $tbody.html('')

  for (const symbol of symbols) {
    const symbolKatex = katex.renderToString(symbol.symbol, { output: 'mathml' })
    const unitKatex = katex.renderToString(symbol.isConstant ? symbol.value + ' ' + symbol.unit : symbol.unit, {
      output: 'mathml'
    })

    const html = `<tr><td style="text-align: left">${symbol.name}</td><td>${symbolKatex}</td><td>${unitKatex}</td><td>${symbol.description}</td></tr>`

    const $newRow = $(html)
    const $deleteButton = $(
      //'<td><button class="button is-danger is-rounded" style="margin: 2px 0">Löschen</button></td>'
      ''
    )

    $newRow.append($deleteButton)

    $tbody.append($newRow)
  }
}

db.collection('symbols')
  .orderBy('name')
  .onSnapshot(snapshot => {
    symbols = []

    snapshot.forEach(doc => {
      symbols.push(doc.data())
    })

    updateUI()
  })
