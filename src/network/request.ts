import axios from 'axios'

// 封装axios请求
export function request(config: Object) {
    // 在内部创建一个实例,带上baseUrl
    const instance = axios.create({
        baseURL: 'https://service-o4cdmcrw-1322204737.gz.apigw.tencentcs.com/release/',
        // baseURL: 'https://cloudmusicapi-one.vercel.app/',
        timeout: 20000
    });

    // 请求拦截
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data;
    });

    return instance(config);
}