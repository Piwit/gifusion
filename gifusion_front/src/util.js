export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export function getUserLangISO6391() {
  var userLang = navigator.language || navigator.userLanguage;
  if (userLang.includes('-'))
    return userLang.split('-')[0];
  if (userLang.includes('_'))
    return userLang.split('_')[0];
  return userLang.substring(0,2);
}
