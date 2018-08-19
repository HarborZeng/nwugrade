# grade.tellyouwhat.cn

> 西北大学第三方成绩查询系统前端

查看在线版本[grades.tellyouwhat.cn](grades.tellyouwhat.cn)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

这个项目使用到了vue系列脚手架工具，包括vue-cli, vue-router, vuex, bootstrap-vue等，实现一个成绩查询的客户端。更多说明详见代码注释。
    ```"axios": "^0.18.0",
    "vue": "^2.5.2",
    "vue-full-loading": "^1.2.1",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
    "vue-loader": "^13.3.0",
    "webpack": "^3.6.0",
    "bootstrap-vue": "^2.0.0-rc.11",```
    
# 源码阅读说明

- 外层大多数文件都是vue-cli自动生成的

![sss](https://github.com/HarborZeng/grade.tellyouwhat.cn/readmeImage/代码结构介绍.png)

- 我们需要关注的是src、static目录，index.html和package.json

  [src/App.vue](https://github.com/HarborZeng/grade.tellyouwhat.cn/src/App.vue)和[src/main.js](https://github.com/HarborZeng/grade.tellyouwhat.cn/src/App.vue)是看源码的入口，请看他俩的注释
