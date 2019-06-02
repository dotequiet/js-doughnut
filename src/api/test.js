import {makeGet, apiurlaccount} from './_help.js'

export const login = (params) => makeGet(apiurlaccount('/login'), params)
