const Store = require('electron-store');

export function setModelUrl(model_url) {
  const store = new Store()
  store.set("MODEL_URL", model_url);
}

export function setAction(action) {
  const store = new Store()
  store.set("ACTION", action);
}

export function getConfiguration() {
  const store = new Store()
  let configuration = {};
  configuration["model_url"] = store.get("MODEL_URL");
  configuration["action"] = store.get("ACTION");
  return configuration;
}

export function setAlertsConfig(keyStore,param) {
  const store = new Store()
  store.set(keyStore,param)
}

export function getAlertsConfig(keyStore) {
  const store = new Store()
  return store.get(keyStore)
}
