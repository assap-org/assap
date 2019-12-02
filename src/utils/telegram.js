
/**
 * Sends Telegram notification.
 * @function
 * @param {String} token - telegram bot token
 * @param {String} chat_id - Telegram chat id
 * @param {String} msg - Message to send
 */
export function sendTelegram (bot, chat_id, msg){

  try {
    bot.sendMessage(chat_id, msg);
  } catch(e) {
    console.log(e);
  }
}
