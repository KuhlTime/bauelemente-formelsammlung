import './js/index'
import 'katex/dist/katex.min.css'

console.info('Developed by André Kuhlmann: https://kuhlti.me')

function colorTrace(msg, color) {
  console.info('%c' + msg, 'color:' + color + ';font-weight:bold;')
}
colorTrace('Type "symbols" inside the console to return each symbol inside an JSON Array', '#2ecc71')
