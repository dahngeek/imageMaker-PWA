// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
var dialogPolyfill = require('dialog-polyfill')
// console.log(DialogPoly)
// var dialogPolyfill = new DialogPoly()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

var canvas = document.getElementById('cvs')
var ctx = canvas.getContext('2d')
var input = document.getElementById('input')
var keywordorlink = document.getElementById('imageSugg')
var reloadImage = document.getElementById('recargarImagen')
var obtainImage = document.getElementById('obtenerImagen')

var updateSize = document.getElementById('actualizarSize')
var widthBox = document.getElementById('ancho')
var heightBox = document.getElementById('alto')
var fontsizeBox = document.getElementById('fuente')

var downloadLnk = document.getElementById('downloadLnk')
var width = (canvas.width = 450)
var height = (canvas.height = 850)
var fontFamily = 'Raleway'
var fontSize = '35px'
var fontColour = 'rgba(255,255,255,0.8)'
var spacing = 10
var img = new Image()

function fragmentText (text, maxWidth) {
  var words = text.split(' ')
  var lines = []
  var line = ''

  if (ctx.measureText(text).width < maxWidth) {
    return [text]
  }
  while (words.length > 0) {
    while (ctx.measureText(words[0]).width >= maxWidth) {
      var tmp = words[0]
      words[0] = tmp.slice(0, -1)
      if (words.length > 1) {
        words[1] = tmp.slice(-1) + words[1]
      } else {
        words.push(tmp.slice(-1))
      }
    }
    if (ctx.measureText(line + words[0]).width < maxWidth) {
      line += words.shift() + ' '
    } else {
      lines.push(line)
      line = ''
    }
    if (words.length === 0) {
      lines.push(line)
    }
  }
  return lines
}

function textOffsetFromLines (linesCount) {
  return Math.floor(height / 2 - linesCount * (parseInt(fontSize, 0) / 2) + spacing) - 3
}

function toDataURL (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

function loadImage (key, isurl) {
  img = new Image()
  var etiqueta = (false || key)
  if (etiqueta && !isurl) {
    var xmlhttp = new XMLHttpRequest()
    var url = 'https://api.unsplash.com/search/photos?query=' + etiqueta + '&per_page=200&client_id=9f3fc1c2373ece156f0e3069b9c366cc8adeeb9af5c23f713ab5c6d194a0b2c3'

    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var myArr = JSON.parse(this.responseText)
        var randompos = Math.floor(Math.random() * (myArr.results.length - 1))
        var imgurl = myArr.results[randompos].urls.regular
        toDataURL(imgurl, function (dataUrl) {
          img.src = dataUrl
          // console.log('RESULT:', dataUrl)
        })
      }
    }
    xmlhttp.open('GET', url, true)
    xmlhttp.send()
  } else {
    var imgurl
    if (isurl) {
      imgurl = key
    } else {
      imgurl = 'https://unsplash.it/' + width + '/' + height + '/?random&' + Math.floor(Math.random() * 10)
    }
    console.log('nueva imagen.')
    toDataURL(imgurl, function (dataUrl) {
      img.src = dataUrl
      // console.log('RESULT:', dataUrl)
    })
  }
  img.onload = draw
}

loadImage(false)

function drawBackgroundOverlay () {
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = 'rgba(0,0,0,0.6)'
  ctx.fill()
}

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, 0.1, 0.5)
  drawBackgroundOverlay()
  ctx.font = 'bold ' + fontSize + ' ' + fontFamily
  ctx.textAlign = 'center'
  ctx.fillStyle = fontColour
  var lines = fragmentText(input.value, width - parseInt(fontSize, 0))
  var offset = textOffsetFromLines(lines.length)
  lines.forEach(function (line, i) {
    ctx.fillText(line, width / 2, offset + (i + 1) * (parseInt(fontSize, 0) + spacing))
  })
  ctx.restore()
}

input.onkeyup = function (e) { // keyup because we need to know what the entered text is.
  draw()
}

obtainImage.onclick = function (e) { // keyup because we need to know what the entered text is.
  if (keywordorlink.value.indexOf('http') !== -1) {
    loadImage(keywordorlink.value, true)
  } else {
    loadImage(keywordorlink.value)
  }
}

reloadImage.onclick = function (e) { // keyup because we need to know what the entered text is.
  loadImage(false)
}

updateSize.onclick = function (e) {
  console.log(widthBox.value)
  console.log(heightBox.value)
  console.log(fontsizeBox.value)
  if (widthBox.value !== '' && widthBox.value && widthBox.value > 10) {
    width = (canvas.width = widthBox.value)
  }
  if (heightBox.value && heightBox.value !== '' && heightBox.value > 10) {
    height = (canvas.height = heightBox.value)
  }
  if (fontsizeBox.value && fontsizeBox.value !== '' && fontsizeBox.value > 10) {
    fontSize = fontsizeBox.value + 'px'
  }
  draw()
}

function download () {
  var dt = canvas.toDataURL('image/jpeg')
  this.href = dt
}
downloadLnk.addEventListener('click', download, false)

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
function drawImageProp (ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0
    w = ctx.canvas.width
    h = ctx.canvas.height
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  var iw = img.width
  var ih = img.height
  var r = Math.min(w / iw, h / ih)
  var nw = iw * r   // new prop. width
  var nh = ih * r   // new prop. height
  var cx
  var cy
  var cw
  var ch
  var ar = 1

  // decide which gap to fill
  if (nw < w) ar = w / nw
  if (nh < h) ar = h / nh
  nw *= ar
  nh *= ar

  // calc source rectangle
  cw = iw / (nw / w)
  ch = ih / (nh / h)

  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY

  // make sure source rectangle is valid
  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}

var dialogButton = document.querySelector('.dialog-button')
var dialog = document.querySelector('#dialog')

if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog)
}
dialogButton.addEventListener('click', function () {
  dialog.showModal()
})
dialog.querySelector('button:not([disabled])').addEventListener('click', function () {
  dialog.close()
})
