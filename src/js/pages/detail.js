import $ from 'jquery'
import katex from 'katex'
import stateManager from '../model/state-manager'

import switchPage from '../switch-page'

const $page = $('#page-detail')

$page.find('#cancleBtn').on('click', () => {
  switchPage('home')
})

const changeHandler = () => {
  const symbol = stateManager.getSymbol()

  if (symbol) {
    const symbolKatex = katex.renderToString(symbol.symbol, { output: 'mathml' })
    const unitKatex = katex.renderToString(symbol.isConstant ? symbol.value + ' ' + symbol.unit : `[${symbol.symbol}]=` + symbol.unit, {
      output: 'mathml'
    })

    const formulas = (symbol.formulas || []).map(s => '<p>' + katex.renderToString(symbol.symbol + '=' + s, { output: 'mathml' }) + '</p>')

    $page.find('#symbol').html(symbolKatex)
    $page.find('#title').html(symbol.name)
    $page.find('.subtitle').html(symbol.description)
    $page.find('#unitTitle').html(symbol.isConstant ? 'Wert' : 'Einheiten')
    $page.find('#units').html(unitKatex)
    $page.find('#formulas').html('').append(formulas)
  } else {
  }
}

stateManager.delegate = changeHandler
