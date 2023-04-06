const axios = require('axios');
const cron = require('node-cron');

const MATTERMOST_WEBHOOK_URL = 'https://mattermost.incubateur.net/hooks/kakczfaj5tf8xrgchs45h3busw';

const postMessage = async (message) => {
  try {
    await axios.post(MATTERMOST_WEBHOOK_URL, {
      text: message,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
  }
};

const sendMessageWeekly = () => {
  // Planification de l'envoi du message hebdomadaire
  // Chaque lundi à 9h00
  cron.schedule('0 9 * * 1', () => {
    postMessage('Qui est au 34 cette semaine ? \n Lundi 🔵 | Mardi 🔴 | Mercredi 🟠 | Jeudi 🟢 | Vendredi ⚫️');
  });
};

sendMessageWeekly();
