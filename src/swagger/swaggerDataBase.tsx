import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development';

let host = ''
let str: string | undefined = ''
if (isDev) {
    str = axios.defaults.baseURL
    let reg = /http(s)?:\/\/([A-Za-z0123456789:\.]+)\/\S+/;
    let result = undefined;
    if (typeof str === "string") {
        result = reg.exec(str);
    }
    if (result) {
        host = result[2]
    }
} else {
    str = window.location.href
    let reg = /http(s)?:\/\/([A-Za-z0123456789:\.]+)\/\S+/;
    let result = reg.exec(str);
    if (result) {
        host = result[2]
    }
}

let swaggerDataBase = {
    "swagger": "2.0",
    "info": {
        // "description": "全新的接口文档",
        "version": "1.0.0",
        "title": "UWinsure ERP API Document",
        // "termsOfService": "http://swagger.io/terms/",
        // "contact": {
        //     "email": "apiteam@swagger.io"
        // },
        // "license": {
        //     "name": "Apache 2.0",
        //     "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        // }
    },
    "host": host,
    // "basePath": "/api/v2",
    // "tags": [
    //     {
    //         "name": "baidu_task",
    //         "description": "baidu任务相关接口",
    //         "externalDocs": {
    //             "description": "Find out more",
    //             "url": "http://swagger.io"
    //         }
    //     },
    //     {
    //         "name": "baidu_systemset",
    //         "description": "baidu系统设置相关接口",
    //         "externalDocs": {
    //             "description": "Find out more",
    //             "url": "http://swagger.io"
    //         }
    //     },
    // ],
    // "schemes": ["https", "http"],
    "paths": {
    },
}

export default swaggerDataBase
