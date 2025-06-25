
{
  "name": "SIGMA-XD",
  "version": "1.0.0",
  "description": "A WhatsApp Bot by WASEEM-TECH powered by Baileys",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.0",
    "express": "^4.18.2",
    "qrcode-terminal": 
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let latestPairingCode = null;

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: ['SIGMA-XD', 'Chrome', '1.0.0'],
    });

  sock.ev.on('connection.update', async (update) => {
    if (update.pairingCode) {
      latestPairingCode = update.pairingCode;
      console.log('✅ Pairing Code:', latestPairingCode);
    }
    if (update.connection === 'open') {
      console.log('✅ Bot Connected to WhatsApp!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text) return;

    const commandName = text.trim().split(' ')[0].substring(1).toLowerCase();
    const args = text.trim().split(' ').slice(1);

    const commandPath = path.join(__dirname, 'commands', `commandName.js`);
    if (fs.existsSync(commandPath)) 
      const command = require(commandPath);
      await command.execute(sock, msg, args);
    );


startSock();

app.use(express.static('public'));
app.get('/getcode', (req, res) => 
  res.send( code: latestPairingCode || 'Generating...' );
);
app.listen(port, () => console.log(`🌐 Running on http://localhost:{port}`));
