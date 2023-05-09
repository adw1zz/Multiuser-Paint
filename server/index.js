const express = require('express');
require('dotenv').config();
const app = express();
const WebSocketServer = require('express-ws')(app);
const aWss = WebSocketServer.getWss();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                broadcastConnection(msg);
                break;    
        }
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(msg);
}

const broadcastConnection = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }   
    });
}