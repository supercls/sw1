

### 一、Install dependencies,

```bash
$ yarn
```

or

```
$ npm install
```

> 推荐使用 yarn , **[yarn安装与常用命令](http://liqingsong.cc/article/detail/9)** 。

### 二、Compiles and hot-reloads for development

```bash
$ yarn electron:serve
```

or

```
$ npm run electron:serve
```


### 三、Compiles and minifies for production

```bash
$ yarn electron:build
```
or

```
$ npm run electron:build
```
```
~\gcc-front\\dist_electron\win-ia32-unpacked

gcc后台服务放这个路径下的gcc目录里 exe名称gccservice
```

### 注意!!!electron 频繁写入磁盘数据导致的错误Error: EPERM: operation not permitted, rename，修改对应的依赖包
>**(https://github.com/vue-electron/vuex-electron/pull/20/commits/bd622ad6ccdf2e3b75331edc11c00edf6f48094d)**
>**(https://github.com/vue-electron/vuex-electron/pull/20)**

