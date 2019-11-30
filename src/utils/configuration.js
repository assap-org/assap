const Store = require('electron-store');
import {deserialize} from './descriptors';
import {encrypt,decrypt} from "@/utils/cipher";

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

export function saveDescriptors(data,userpass) {
  const Store = require('electron-store');
  const store = new Store();
  var decrypted_desriptors = []
  var encrypted_descriptors_old= store.get("DESCRIPTORS")
  if (encrypted_descriptors_old != undefined) {
    if(encrypted_descriptors_old.length > 0){
      decrypted_desriptors = decrypt(encrypted_descriptors_old,userpass)
      //TODO check if it works
    }
  }
  decrypted_desriptors.push(data)
  var encrypted_descriptors = encrypt(JSON.stringify(decrypted_desriptors),userpass)
  store.set("DESCRIPTORS", encrypted_descriptors);
}

export function retrieveDescriptors(userpass) {
  const Store = require('electron-store');
  const store = new Store();
  var encrypted_descriptors = store.get("DESCRIPTORS")
  var decrypted_desriptors = []
  if (encrypted_descriptors.length > 0 || encrypted_descriptors != undefined) {
    decrypted_desriptors = decrypt(encrypted_descriptors,userpass)
  }
  const descriptorsList = JSON.parse(decrypted_desriptors)
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
