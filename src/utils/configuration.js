const CONFIGURATION = {
  model_url: 'example',
  action: 'lockscreen'
};

export function setModelUrl(model_url) {
  localStorage.setItem(CONFIGURATION.model_url, model_url);
}

export function setAction(action) {
  localStorage.setItem(CONFIGURATION.action, action);
}

export function getConfiguration() {
  let configuration = {};
  const { model_url, action } = CONFIGURATION;
  configuration[model_url] = localStorage.getItem(model_url);
  configuration[action] = localStorage.getItem(action);
  return configuration;
}
