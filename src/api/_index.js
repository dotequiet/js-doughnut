import axios from 'axios'
import cookies from 'cookies-js'

function createUUid () {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)

  let uuid = s.join('')
  return uuid;
}
axios.interceptors.request.use(function (config) {
  config.headers['X-Request-ID'] = createUUid()
  if (cookies.get('token')) {
    config.headers['token'] = cookies.get('token')
  }
  return config
})

export function get (...args) {
  return axios.get.apply(axios, args)
}

export function put (...args) {
  return axios.put.apply(axios, args)
}

export function post (...args) {
  return axios.post.apply(axios, args)
}

export function postJson (...args) {
  axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json'
    return config
  })
  return axios.post.apply(axios, args)
}

export function throws (e) {
  throw e
}

export function makeGet (url, opts = {}) {
  let params = JSON.parse(JSON.stringify(opts))
  if (!params.t) {
    params.t = `${new Date().getTime()}`
  }
  return get(`${url}`, {
    params: params
  })
}

export function makePut (url, opts = {}) {
  return put(`${url}`, opts)
}

export function makePost (url, opts = {}) {
  return post(`${url}`, opts)
}

export function makePostJson (url, opts = {}) {
  return postJson(`${url}`, opts)
}

export function apiurlaccount (url) {
  return `/api${url}`
}
export function apiurlclassroom (url) {
  return `/classroomrest${url}`
}
export function apiurlppt (url) {
  return `/pptrest${url}`
}
export function apiurlqos (url) {
  return `/qosrest${url}`
}
