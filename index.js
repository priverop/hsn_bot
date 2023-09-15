const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "TOKEN";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  getPrice(chatId);
});

function getPrice(chatId) {
  const axios = require("axios");
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;

  axios
    .get("https://www.hsnstore.com/marcas/sport-series/evowhey-protein-2-0")
    .then(function (response) {
      const dom = new JSDOM(response.data);
      [...dom.window.document.querySelectorAll("#old-price-16688")].forEach(
        (el) => {
          bot.sendMessage(chatId, el.textContent);
        }
      );
    });
}
