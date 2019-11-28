// This file contains all code necessary to cipher all the configuration in the ASSAP tool.
// Having all the configuration encrypted is a security requirement. It prevents an attacker from modifying the identification
// configuration of the ASSAP tool. For this purpose we use AES and GCM.

const crypto = require('crypto');
const algorithm = 'aes-256-gcm';


function encrypt(text,password) {
  const key = crypto.scryptSync(password, 'salt', 32);
  const iv = crypto.randomBytes(16); // Initialization vector.
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  var encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex');
  var tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag,
    iv: iv
  };
}

function decrypt(encrypted,password) {
  const key = crypto.scryptSync(password, 'salt', 32);
  const decipher = crypto.createDecipheriv(algorithm, key, encrypted.iv);
  decipher.setAuthTag(encrypted.tag);
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}
