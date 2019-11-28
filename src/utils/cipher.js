/**
  * This file contains all code necessary to cipher all the configuration in the ASSAP tool.
  * Having all the configuration encrypted is a security requirement. It prevents an attacker from modifying the identification
  * configuration of the ASSAP tool. For this purpose we use AES and GCM.
  */


const crypto = require('crypto');
const algorithm = 'aes-256-gcm';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};


/**
 * Encrypts data using aes-256-gcm, a random salt and a random iv.
 * @function
 * @param {String} text - Text to encrypt
 * @param {String} password - User password
 */
export function encrypt(text, password) {
  const salt = genRandomString(16) // It is recommended that a salt is random and at least 16 bytes long.
  const key = crypto.scryptSync(password, salt, 32)
  const iv = crypto.randomBytes(16) // Initialization vector.
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  var content = cipher.update(text, 'utf8', 'hex')
  content += cipher.final('hex')
  var tag = cipher.getAuthTag()
  return {
    content,
    tag,
    iv,
    salt
  }
}


/**
 * Decrypts data using aes-256-gcm, a random salt and a random iv.
 * @function
 * @param {String} encrypted - Text to dencrypt
 * @param {String} password - User password
 */
export function decrypt(encrypted,password) {
  const key = crypto.scryptSync(password, encrypted.salt, 32);
  const decipher = crypto.createDecipheriv(algorithm, key, encrypted.iv);
  decipher.setAuthTag(encrypted.tag);
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}
