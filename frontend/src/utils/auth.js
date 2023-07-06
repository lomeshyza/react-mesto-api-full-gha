export const baseUrl = "http://localhost:3000";

function handleResponse(res) {
  // console.log(`Это res: ${res}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
//signup
export function register(email, password) {
  return fetch(`${ baseUrl }/signup`, {
    method: "POST",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json',},
    body: JSON.stringify({email, password}),
  }).then(handleResponse);
}

//signin
export function login( email, password ) {
  console.log(`Это localStorage: ${localStorage.getItem('jwt')}`);
  return fetch(`${ baseUrl }/signin`, {
    method: "POST",
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json',
    //authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
    
    body: JSON.stringify({email, password}),
  }).then(handleResponse);
}
export function checkToken(jwt) {
  console.log(`Это jwt: ${jwt}`);
  return fetch(`${ baseUrl }/users/me`, {
    method: "GET",
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`},
    }).then(handleResponse);
}

