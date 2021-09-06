import axios from "axios";

export function request(config) {
  //1.创建实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878", //请求地址
    timeout: 5000, //多久超时
  });

  // 2.axios请求拦截
  // 就是在请求数据时对数据做一些处理
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  // 2.2响应拦截
  // 对请求成功的数据做一些处理
  instance.interceptors.response.use(
    (config) => {
      return config.data;
    },
    (err) => {
      console.log(err);
    }
  );

  //3.发送真正的网络请求
  // 因为我们上面实例返回的类型就是一个promise
  // 所以我们下面可以直接把请求返回出去
  return instance(config);
}
