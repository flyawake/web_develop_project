import { USER_MODULE } from './_prefix'

export function register(userInfo) {
  return fetch(`${USER_MODULE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  }).then(res => res.json());
}

export function login(loginInfo) {
  return fetch(`${USER_MODULE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInfo),
  }).then(res => res.json());
} 

export function getUserInfo(userId) {
  return fetch(`${USER_MODULE}/getUserInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}