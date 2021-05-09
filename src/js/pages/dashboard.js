import $ from 'jquery'
import db from '../config/firebase'
import katex from 'katex'

import switchPage from '../switch-page'
import stateManager from '../model/state-manager'

const $tbody = $('tbody')
const $newSymbolBtn = $('#newSymbol')

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

    const $tr = $('<tr></tr>')
    const $detailButton = $(`<a>${symbol.name}</a>`)
    const $name = $('<td style="text-align: left"></td>').append($detailButton)
    const $symbol = $(`<td>${symbolKatex}</td>`)
    const $unit = $(`<td>${unitKatex}</td>`)
    const $description = $(`<td>${symbol.description}</td>`)

    const eventHandler = (symbol) => {
        stateManager.setSymbol(symbol)
        switchPage('detail')
    }

    $detailButton.on('click', () => eventHandler(symbol))

    const $deleteButton = $(
      //'<td><button class="button is-danger is-rounded" style="margin: 2px 0">Löschen</button></td>'
      ''
    )

    $tr.append($name, $symbol, $unit)
    $tbody.append($tr)
  }
}

db.collection('symbols')
  .orderBy('name')
  .onSnapshot(snapshot => {
    symbols = []

    snapshot.forEach(doc => {
      symbols.push({ id: doc.id, ...doc.data() })
    })

    // update stateManager
    const detailSymbol = stateManager.getSymbol()
    if (detailSymbol) {
      const newSymbol = symbols.find(s => s.id === detailSymbol.id)
      stateManager.setSymbol(newSymbol)
    }

    updateUI()
  })
