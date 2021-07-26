const socket = io('https://chat.bewedoc.ru/', {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    timeout: 10000, //before connect_error and connect_timeout are emitted.
    transports: ['websocket']
  });
const message = document.querySelector('.message');
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let [data] = new FormData(e.target)
    data = data[1];
    if(!data) return;
    socket.emit('chat message', {
        message: data
    });
    e.target.children[0].value = ''
})

socket.on('chat message', data => {
    let li = document.createElement('li');
    li.textContent = data.message;
    message.appendChild(li)
})