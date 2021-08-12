const http = require('http');
const express = require('express');
const app = express();
const clientPath = `${__dirname}/../client`;
const server = http.createServer(app);
const io = require('socket.io')(server);


app.use(express.static(clientPath));

let counter = 0;
io.on('connection', (socket) => {
    counter++
    console.log(counter+ ' someone connected');

    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });

    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
    });

});

const PORT = 8080 || process.env.PORT;

server.listen(PORT, () =>{
    console.log("server running on port "+PORT);
});



