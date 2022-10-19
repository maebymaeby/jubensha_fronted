import {
    _axios as request
} from "../../plugins/axios";

const actions = {
    //获取商品类别
    getProductCategories() {
        return new Promise((resolve, reject) => {
            request({
                url: '/item/class/getList',
                method: 'get',
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    addCategories(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/class/add',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    //上架
    onShelfProduct(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/onSale',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    //下架
    offShelfProduct(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/offSale',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    //删除
    deleteProduct(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/delete',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    //新建一个商品
    addProductBySpu(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/spu/add',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    新建一个商品的规格
    addProductBySku(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/add',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    编辑库存
    setStock(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/setStock',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    可售
    getNewList(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/getNewList',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    已下架
    getOffSaleList(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/getOffSaleList',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    已上架
    getOnSaleList(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/getOnSaleList',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    已售罄
    getOutOfStockList(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/getOutOfStockList',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    分类内的全部商品
    getListByClass(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/getListByClass',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    上传图片
    uploadImg(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/file/uploadImg',
                method: 'post',
                data: data,
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    编辑，sku级别
    editProductBySku(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/modify',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    编辑，spu级别
    editProductBySpu(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/spu/modify',
                method: 'post',
                data: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
//    搜索
    searchByKeyAndClassIdAndStatus(_,data){
        return new Promise((resolve, reject) => {
            request({
                url: '/item/sku/searchByKeyAndClassIdAndStatus',
                method: 'post',
                params: data,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
}

export default {
    namespaced:true,
    actions,
}