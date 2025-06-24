```js
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

let latestCode = null;

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: ['Ubuntu', 'Chrome', '20.0'],
  });

  sock.ev.on('connection.update', (update) => {
    if (update.pairingCode) {
      latestCode = update.pairingCode;
      console.log("Pairing Code:", latestCode);
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

startSock();

app.get('/getcode', (req, res) => {
  res.send({ code: latestCode || "Generating..." });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
```
