const docket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

var req = new XMLHttpRequest();
var url = '/login';
req.open('GET',url,true);
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);
req.send();
function onLoad() {
   var response = this.responseText;
   // var parsedResponse = JSON.parse(response);
   // var username = parsedResponse['user'];
   var username = response['user'];
   name=username;
}

function onError() {
  console.log('error receiving async AJAX call');
}

// do {
    // name = prompt('Please enter your name: ')
// } while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: " ",
        message: message.trim()
    }
    // Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    docket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages
docket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
