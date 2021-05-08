import $ from 'jquery'

const pages = ['home', 'new-symbol', 'detail']

const startingPage = pages[0]

$(document).ready(function () {
  switchPage(startingPage)
})

export default function switchPage(toPage) {
  for (const page of pages) {
    $('#page-' + page).hide()
  }

  $('#page-' + toPage).fadeIn()
}
