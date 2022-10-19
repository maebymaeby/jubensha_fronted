import { _axios as request } from '@/plugins/axios'

const actions = {
  login(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/user/adminLogin',
          method: 'post',
          data: data
        })
        .then((response) => {
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("profile", JSON.stringify(response.data.data));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    location.replace("/");
  }
}

export default {
  namespaced: true,
  actions,
};