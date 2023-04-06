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
  
// Appelez cette fonction avant d'appeler sendMessageWeekly()
testMessage();
  

const sendMessageWeekly = () => {
  // Planification de l'envoi du message hebdomadaire
  // Chaque lundi à 9h00
  cron.schedule('0 9 * * 1', () => {
    postMessage('Qui est au 34 cette semaine ? \n Lundi 🔵 | Mardi 🔴 | Mercredi 🟠 | Jeudi 🟢 | Vendredi ⚫️');
  });
};

sendMessageWeekly();


// Créez un serveur HTTP minimal
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Mattermost en cours d\'exécution\n');
  });
  
  // Écoutez un port spécifié dans les variables d'environnement ou utilisez le port 3000 par défaut
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Le serveur est à l'écoute sur le port ${port}`);
    sendMessageWeekly();
  });