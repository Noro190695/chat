const express = require('express');
const path = require('path');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);
const PORT =process.env.PORT ?? 8080;


app.get('/', (res,req) => {
    req.sendFile(path.resolve(__dirname, 'index.html'))
});
io.on('connection', socket => {
    socket.on('chat message', data => {
        io.emit('chat message', {
            message: data.message
        })
    })
})
app.use(express.static(path.resolve(__dirname, 'assets')))
http.listen(PORT, () => {
    console.log('Server Started PORT: ' + PORT);
})