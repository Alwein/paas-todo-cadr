const axios = require('axios');
const cron = require('node-cron');
const http = require('http');

const postMessage = async (message) => {
  try {
    await axios.post(process.env.MATTERMOST_WEBHOOK_URL, {
      text: message,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
  }
};

const testMessage = async () => {
  if (process.env.TEST_MESSAGE) {
    await postMessage('Ceci est un message de test du bot Mattermost. Ignorez-le.');
  }
};
  
testMessage();

const sendMessageWeekly = () => {

  cron.schedule('0 7 * * 4', () => {
    postMessage('Qui est au 34 cette semaine ? \n Lundi 1️⃣ | Mardi 2️⃣ | Mercredi 3️⃣ | Jeudi 4️⃣ | Vendredi 5️⃣');
  });
};

sendMessageWeekly();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Mattermost en cours d\'exécution\n');
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Le serveur est à l'écoute sur le port ${port}`);
    sendMessageWeekly();
  });