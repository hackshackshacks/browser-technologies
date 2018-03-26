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
}
// feature check
if (window.addEventListener && document.body.classList) {
  var audio = document.querySelectorAll('audio')
  document.body.classList.add('js')
  for (var i = 0; i < audio.length; ++i) {
    // create button element
    var button = document.createElement('button')
    // set key to match audio
    button.dataset.key = audio[i].dataset.key
    var keyText = document.createTextNode(audio[i].dataset.key)
    button.appendChild(keyText)
    // set source to match source
    var source = audio[i].querySelector('source')
    button.dataset.src = source.src

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
    var button = document.querySelector(`button[data-key="${e.key.toLowerCase()}"`)
    if (button && !e.shiftKey) {
      playSound(button)
    }
  })
}
