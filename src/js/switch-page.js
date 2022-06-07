import $ from 'jquery'

const pages = ['home', 'new-symbol', 'detail']
var currentPage = 'home'
var homeScrollPosition = 0

const startingPage = pages[0]

$(document).ready(function () {
  switchPage(startingPage)
})

export default function switchPage(toPage) {
  for (const page of pages) {
    $('#page-' + page).hide()
  }

  $('#page-' + toPage).fadeIn()
  currentPage = toPage

  // restore scroll position
  if (toPage == 'home') {
    $(window).scrollTop(homeScrollPosition)
  }
}

$(window).on('scroll', () => {
  if (currentPage != 'home') return
  homeScrollPosition = $(document).scrollTop();
});

