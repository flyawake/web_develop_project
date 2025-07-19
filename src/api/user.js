import { USER_MODULE } from './_prefix'

/**
 * 注册用户
 * @param {Object} userInfo - { username, phone, password }
 * @returns {Promise}
 */
export function register(userInfo) {
  return fetch(`${USER_MODULE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  }).then(res => res.json());
}

/**
 * 用户登录
 * @param {Object} loginInfo - { phone, password }
 * @returns {Promise}
 */
export function login(loginInfo) {
  return fetch(`${USER_MODULE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInfo),
  }).then(res => res.json());
} 