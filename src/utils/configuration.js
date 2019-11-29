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

export function setConfigured(isConfigured) {

  const Store = require('electron-store');
  const store = new Store();

  store.set("IS_CONFIGURED", isConfigured);
}

export function saveDescriptors(data) {
  const Store = require('electron-store');
  const store = new Store();
  const descriptorsList = JSON.parse(store.get("DESCRIPTORS"))
  descriptorsList.push(data)
  store.set("DESCRIPTORS", JSON.stringify(descriptorsList));
}

export function retrieveDescriptors() {
  const Store = require('electron-store');
  const store = new Store();
  const descriptorsList = JSON.parse(store.get("DESCRIPTORS"))

  return descriptorsList;
}

export function getConfiguration() {

  const Store = require('electron-store');
  const store = new Store();

  let configuration = {};
  configuration["model_url"] = store.get("MODEL_URL");
  configuration["action"] = store.get("ACTION");
  configuration["isConfigured"] = store.get("IS_CONFIGURED");
  return configuration;
}
