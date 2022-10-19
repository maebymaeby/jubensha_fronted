import { _axios as request } from "../../plugins/axios";

const actions = {
  getOrderListByStatus(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/getListByStatus',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  confirmOrderByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/confirm',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deliverOrderByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/deliver',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  serveOrderByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/serve',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  acceptRefundByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/acceptClose',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  refuseRefundByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/refuseClose',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  cancelOrderByID(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/order/cancel',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addSpu(_, data) {
    return new Promise((resolve, reject) => {
      request({
          url: '/item/spu/add',
          method: 'post',
          params: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default {
  namespaced: true,
  actions,
};