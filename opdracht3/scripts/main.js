function insertAfter (referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function playSound (el) {
  el.classList.remove('animate')
  // create new sound instance
  var sound = document.createElement('audio')
  // add animation
  el.classList.add('animate')
  // set source to match data
  sound.src = el.dataset.src
  sound.play()
}
function loopSound (el, key) {
  // create new sound instance
  var sound = document.createElement('audio')
  el.classList.add('loop')
  sound.src = el.dataset.src
  // set sound to loop
  sound.loop = true
  sound.play()
  // add event to stop loop
  el.addEventListener('click', function () {
    sound.loop = false
    el.classList.remove('loop')
  })
  if (key) {
    window.addEventListener('keydown', function (e) {
      if (e.key.toLowerCase() === key) {
        sound.loop = false
        el.classList.remove('loop')
      }
    })
  }
}
// check if device is mobile phone
function checkMobile () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
    return true
  } else {
    return false
  }
}
// feature check
var test = document.createElement('p')
if (window.addEventListener && 'querySelector' in document && 'classList' in test) { // feature detection
  var audio = document.querySelectorAll('audio')
  document.body.classList.add('js')
  var mobile = checkMobile()
  var looping = []
  for (var i = 0; i < audio.length; ++i) {
    // create button element
    var button = document.createElement('button')
    // set key to match audio
    button.dataset.key = audio[i].dataset.key

    if (!mobile) {
      var keyText = document.createTextNode(audio[i].dataset.key)
      button.appendChild(keyText)
    }
    // set source to match source
    button.dataset.src = audio[i].src

    // trigger sound on click
    button.addEventListener('click', function () {
      playSound(this)
    })

    // trigger loop on double-click
    button.addEventListener('dblclick', function () {
      loopSound(this)
    })

    // remove animation
    button.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })

    // prevent focus on click
    button.addEventListener('mousedown', function (e) {
      e.preventDefault()
    })

    // insertElement into html
    insertAfter(audio[i], button)
  }
  // Listen to keys
  window.addEventListener('keydown', function (e) {
    var button = document.querySelector(`button[data-key="${e.key.toLowerCase()}"]`)
    if (button && !e.shiftKey) {
      playSound(button)
    } else if (button && e.shiftKey) {
      looping.push(e.key.toLowerCase())
      loopSound(button, e.key.toLowerCase())
    }
  })
}
