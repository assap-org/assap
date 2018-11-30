const CONFIGURATION = {
  model_url: 'AWS_KEY',
  action: 'AWS_SECRET_KEY'
};

export function setModelUrl(model_url) {
  localStorage.setItem(CONFIGURATION.model_url, model_url);
}

export function setAction(action) {
  localStorage.setItem(CONFIGURATION.action, action);
}

export function getConfiguration() {
  let credentials = {};
  const { key, secretKey } = CREDENTIALS_KEYS;
  credentials[key] = localStorage.getItem(key);
  credentials[secretKey] = localStorage.getItem(secretKey);
  return credentials;
}
