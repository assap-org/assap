const CONFIGURATION = {
  model_url: 'https://github.com/assap-org/models/releases/download/1.0.0',
  action: 'lockscreen'
};

export function setModelUrl(model_url) {
  localStorage.setItem("MODEL_URL", model_url);
}

export function setAction(action) {
  localStorage.setItem("ACTION", action);
}

export function getConfiguration() {
  let configuration = {};
  configuration["model_url"] = localStorage.getItem("MODEL_URL");
  configuration["action"] = localStorage.getItem("ACTION");
  return configuration;
}
