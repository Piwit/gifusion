import { objToQueryString, getUserLangISO6391 } from '../util.js';

const URL = process.env.REACT_APP_URL;

export const search = (term, page) => {
  const params = objToQueryString({
    term: term,
    page: page ? page : 0,
    lang: getUserLangISO6391()
  });
  return fetch(URL+`?${params}`, {method: 'GET'}).then(res => res.json().then(res => res));
}
