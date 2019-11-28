var nodemailer = require('nodemailer');

/**
 * Sends email alerts.
 * @function
 * @param {String} user - user's email address
 * @param {String} pass - user's email password
 * @param {String} to - destination email address
 * @param {String} subject - email subject
 * @param {String} html - email's text
 * @param {String} attach - email's attachment (image)
 */
export function sendMail (user, pass, to, subject, html, attach){

  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: { user, pass }
  });

  const mailOptions = {
    from: to, // sender address
    to, // list of receivers
    subject, // Subject line
    html // plain text body
    attachments: [
        {   path: attach
        }
      ]
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       throw new Error(err);
     } else {
       console.log(info);
     }
  });
}
