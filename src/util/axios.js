import axios from 'axios'
window.axios = axios;
window.axios.interceptors.response.use(
    function (response) {
        let res = response.data;
        return res;
    },
    function (error) {
        return Promise.reject(error);
    }
);
