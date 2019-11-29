const Store = require('electron-store');
import {deserialize} from './descriptors';

export function setModelUrl(model_url) {
  const store = new Store()
  store.set("MODEL_URL", model_url);
}

export function setAction(action) {
  const store = new Store()
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
  const deserializedList = descriptorsList.map(deserialize)
  return deserializedList;
}

export function getConfiguration() {
  const store = new Store()
  let configuration = {};
  configuration["model_url"] = store.get("MODEL_URL");
  configuration["action"] = store.get("ACTION");
  configuration["isConfigured"] = store.get("IS_CONFIGURED");
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


export function getUserPassword() {
  const store = new Store()
  const userpass = store.get("USERPASSWORD")
  if (userpass == undefined) {
    return userpass
  }
  return JSON.parse(userpass)
}

export function getUserStr(){
  const store = new Store()
  return store.get("USERSTRING")
}
export function setUserPassword(cipherPass,userString) {
  const store = new Store()
  store.set("USERPASSWORD",JSON.stringify(cipherPass))
  store.set("USERSTRING",userString)
}
