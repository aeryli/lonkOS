//----------------------------
//----- appstore backend -----
//----------------------------

import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 9001 });
console.log('WebSocket server is running on "ws://localhost:9001".');
wss.on('connection', (ws) => {
  console.log('connected.');
  ws.on('message', (data) => {
    const message = data.toString();
    console.log(`received: ${message}`);
    ws.send(`${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});