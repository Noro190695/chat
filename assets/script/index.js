let protocol = 'ws://'; 
if (window.location.protocol === 'https:') {
            protocol = 'wss://';
   }

 let wsUri =protocol+ "chat.bewedoc.ru/myws";  
const socket = io(wsUri);

  
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