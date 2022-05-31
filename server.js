const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);

const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const server = app.listen(3333, () => {
    console.log('Server started!');
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

async function addMsgDb(msg) {
    await client.connect();
    const db = client.db('Messages');
    const collection = db.collection('MessagesList');
    await collection.insertOne({ text: msg, id: Date.now() })
    await client.close();
}

wss.on('connection', ws => {
    ws.on('message', message => {
        message = message.toString('utf8')
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        addMsgDb(message)
    })
});

app.get(/\/messages.*/gi, (req, res) => {
    (async () => {
        await client.connect();
        const reqestedPage = parseInt(req.query.page)
        const db = await client.db('Messages');
        const collection = await db.collection('MessagesList');
        const set = new Set(await collection.find().sort({ id: -1 }).limit(reqestedPage*100).toArray())
        const el = Array.from(set).slice((reqestedPage-1)*100, reqestedPage*100)
        res.send(`${JSON.stringify(el)}`);
    })().catch(e => {
        console.log(e)
    });

});
