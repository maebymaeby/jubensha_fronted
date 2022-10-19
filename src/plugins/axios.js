'use strict'
import axios from 'axios'
import { Message } from 'element-ui';
import GLOBAL from '@/utils/global.js'

axios.defaults.headers.post['Content-Type'] = 'application/json'

let config = {
  baseURL: GLOBAL.baseURL,
  timeout: 5000,
  headers: {
    token: '',
  }
}

// axios内部公用变量和方法
let common = {
  showMessage: function (msg) { // 提示错误信息
    Message({
      message: msg,
      type: "error",
    });
  },
  quitCurrentUser: function () {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    location.replace("/");
  }
}

export const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers.token = '';
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    config.headers.token = '';
    return response
  },
  error => {
    if (error && Object.prototype.hasOwnProperty.call(error, "response") && Object.prototype.hasOwnProperty.call(error.response, "status")) {
      common.showMessage(error.response.status);
      setTimeout(() => { self.quitCurrentUser() }, 1000);
    }
    return Promise.reject(error)
  }
)