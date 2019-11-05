import { objToQueryString, getUserLangISO6391 } from '../util.js';

let url = 'http://localhost:5000';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000';
} else {
  url = 'http://localhost:5000';
}
const URL = url;

export const search = (term, page) => {
  const params = objToQueryString({
    term: term,
    page: page ? page : 0,
    lang: getUserLangISO6391()
  });
  return fetch(URL+`?${params}`, {method: 'GET'}).then(res => res.json().then(res => res));
}
