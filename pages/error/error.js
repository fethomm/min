var searchParams = new URLSearchParams(window.location.search.replace('?', ''))

var h1 = document.getElementById('error-name')
var h2 = document.getElementById('error-desc')
var primaryButton = document.getElementById('primary-button')
var secondaryButton = document.getElementById('secondary-button')

var ec = searchParams.get('ec')
var url = searchParams.get('url')

var websiteNotFound = {
  name: l('serverNotFoundTitle'),
  message: l('serverNotFoundSubtitle'),
  secondaryAction: {
    title: l('archiveSearchAction'),
    url: 'https://web.archive.org/web/*/' + url
  }
}

var sslError = {
  name: l('sslErrorTitle'),
  message: l('sslErrorMessage')
}

var dnsError = {
  name: l('dnsErrorTitle'),
  messge: l('dnsErrorMessage')
}

var offlineError = {
  name: l('offlineErrorTitle'),
  message: l('offlineErrorMessage')
}

// list: https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h&sq=package:chromium&type=cs
const errorCodes = {
  '-21': offlineError, // network changed
  '-104': {
    message: l('genericConnectionFail')
  },
  '-105': websiteNotFound,
  '-106': offlineError,
  '-107': sslError,
  '-109': websiteNotFound,
  '-110': sslError, // this is actually the error code for "server requested a client certificate", but we don't support that yet,
  '-112': sslError,
  '-113': sslError,
  '-116': sslError,
  '-117': sslError,
  '-200': sslError,
  '-201': {
    name: l('sslErrorTitle'),
    message: l('sslTimeErrorMessage')
  },
  '-202': sslError,
  '-203': sslError,
  '-204': sslError,
  '-205': sslError,
  '-206': sslError,
  '-207': sslError,
  '-208': sslError,
  '-210': sslError,
  '-211': sslError,
  '-212': sslError,
  '-213': sslError,
  '-300': {
    name: l('addressInvalidTitle')
  },
  '-501': sslError,
  '-800': dnsError,
  '-801': dnsError,
  '-802': dnsError,
  '-803': dnsError,
  '-804': dnsError,
  '-805': dnsError,
  '-806': dnsError
}

// show the error message and detail

var err = errorCodes[ec]

if (err) {
  h1.innerHTML += err.name || ''
  h2.innerHTML += err.message || ''
} else {
  h1.innerHTML += l('genericError')
}

if (err.secondaryAction) {
  secondaryButton.hidden = false
  secondaryButton.textContent = err.secondaryAction.title
  secondaryButton.addEventListener('click', function () {
    window.location = err.secondaryAction.url
  })
}

// if an ssl error occured, "try again" should go to the http:// version, which might work

if (errorCodes[ec] === sslError) {
  url = url.replace('https://', 'http://')
}

if (url) {
  primaryButton.addEventListener('click', function () {
    window.location = url
  })
}

primaryButton.focus()
