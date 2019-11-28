const Telegraf = require('telegraf')

/**
 * Sends Telegram notification.
 * @function
 * @param {String} token - telegram bot token
 * @param {String} chat_id - Telegram chat id
 * @param {String} msg - Message to send
 */
export function sendTelegram (token, chat_id, msg){
  const bot = new Telegraf(token)

  try {
    bot.telegram.sendMessage(chat_id, msg);
  } catch(e) {
    console.log(e);
  }
}
