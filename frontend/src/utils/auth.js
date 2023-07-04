export const baseUrl = "https://api.starts.mesto.nomoreparties.sbs";

function handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
//signup
export function register(email, password) {
  return fetch(`${ baseUrl }/signup`, {
    credentials: "include",
    method: "POST",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json',},
    body: JSON.stringify({email, password}),
  }).then(handleResponse);
}

//signin
export function login( email, password ) {
  return fetch(`${ baseUrl }/signin`, {
    credentials: "include",
    method: "POST",
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json',},
    body: JSON.stringify({email, password}),
  }).then(handleResponse);
}
export function checkToken(jwt) {
  return fetch(`${ baseUrl }/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`},
    }).then(handleResponse);
}

