const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {
    ws.on('message', message => {
        message=message.toString('utf8')
        if(message === 'exit') {
            ws.close();
        } else {
            server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
        }
        
    })
    ws.send('Добро пожаловать в чат!');
})
