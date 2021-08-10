import confetti from 'canvas-confetti'

var count = 200
var defaults = {
  origin: { y: 0.7 }
}

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    })
  )
}

// if the date is the day of the exam, fire the confetti
var date = new Date('Tue Aug 13 2021 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)')

if (date.getDate() === new Date().getDate()) {
  document.getElementById('luck').innerHTML = '<span>Ich wünsche allen viel Erfolg! 🍀</span><br><br>'

  fire(0.25, {
    spread: 26,
    startVelocity: 55
  })
  fire(0.2, {
    spread: 60
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  })
}
