const CREDENTIALS_KEYS = {
  key: 'AWS_KEY',
  secretKey: 'AWS_SECRET_KEY'
};

export function setCredentials(key, secretKey) {
  localStorage.setItem(CREDENTIALS_KEYS.key, key);
  localStorage.setItem(CREDENTIALS_KEYS.secretKey, secretKey)
}

export function getCredentials() {
  let credentials = {};
  const { key, secretKey } = CREDENTIALS_KEYS;
  credentials[key] = localStorage.getItem(key);
  credentials[secretKey] = localStorage.getItem(secretKey);
  return credentials;
}
