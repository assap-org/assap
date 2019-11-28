const { IncomingWebhook } = require('@slack/client');

/**
 * Sends slack alerts.
 * @function
 * @param {String} url - slack url
 * @param {String} msg - Message to send
 */
export function sendSlack (url, msg) {
  const webhook = new IncomingWebhook(url);

  webhook.send(msg, (err, res) => {
    if (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    } else {
      console.log('Message sent!');
      console.log(res);
    }
  });
}
