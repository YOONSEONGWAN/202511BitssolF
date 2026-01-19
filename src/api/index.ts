// src/api/index.ts

import axios from "axios";

// baseURL 값으로 /api 를 기본으로 가지고 있는 axios 객체를 만들어서  
const api = axios.create({
    baseURL: "/api"
});

// 요청 인터셉터 (예: 토큰 자동 추가)
api.interceptors.request.use((config) => {
    //const token = localStorage.token; 과 동일한 동작
    const token = localStorage.getItem('token');
    //만일 token 이 존재한다면
    if (token) {
        // 1. config.headers가 undefined일 경우 빈 객체로 초기화합니다.
        config.headers = config.headers || {};

        // 2. 이제 config.headers는 객체임이 보장되므로 안전하게 토큰을 추가합니다.
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 401 Unauthorized = 토큰 만료 or 유효하지 않음
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';  // 또는 navigate 사용
        }
        return Promise.reject(error);
  
    }
);

//리턴해준다. 
export default api;