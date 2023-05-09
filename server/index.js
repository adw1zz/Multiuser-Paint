const express = require('express');
require('dotenv').config();
const app = express();
const WebSocketServer = require('express-ws')(app);
const aWss = WebSocketServer.getWss();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT;

const sessions = [];

app.use(cors());
app.use(express.json());

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'save-state':
                setState(msg);
                break;
            case 'draw':
                broadcast(msg);
                break;    
        }
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const setState = (msg) => {
    const index = sessions.findIndex(session => session.id === msg.id);
    sessions[index].state = msg.state;
}

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    const session = sessions.find(session => session.id === msg.id);
    if (!session) {
        sessions.push({id: ws.id, state: ''});
    }
    broadcastConnection(msg);
}

const broadcast = (msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    })
}

const broadcastConnection = (msg) => {
    const session = sessions.find(session => session.id === msg.id);
    const state = session.state;
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify({
                id: msg.id,
                nickname: msg.nickname,
                method: msg.method,
                state: state
            }));
        }   
    });
}