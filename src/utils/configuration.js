export function setModelUrl(model_url) {
  const Store = require('electron-store');
  const store = new Store();

  store.set("MODEL_URL", model_url);
}

export function setAction(action) {

  const Store = require('electron-store');
  const store = new Store();

  store.set("ACTION", action);
}

export function getConfiguration() {

  const Store = require('electron-store');
  const store = new Store();

  let configuration = {};
  configuration["model_url"] = store.get("MODEL_URL");
  configuration["action"] = store.get("ACTION");
  return configuration;
}
