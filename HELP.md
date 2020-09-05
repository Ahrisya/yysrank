# 相关帮助

1. 项目结构说明

```
├── public              # 项目发布的地址，该文件的内容是通过指令自动产生的
├── legacy              # 遗留代码所在的位置，现在已经不存在
│   └── yysrank.js
├── src                 # 未来代码所在的位置，新的代码可以尝试写在里面，打包工具会将它统一编译打包
│   ├── data            # **目前数据所在的位置**
│   ├── images          # 图片
│   ├── styles          # 样式表
│   ├── views           # 布局相关的页面
│   ├── panels          # 具体的功能子页
│   ├── index.ejs
│   ├── index.js
├── static              
│   ├── assets          # 遗留静态资源，大部分静态资源已经转移，待全部完成后删除该目录
│   │   └── img
│   │       ├── icon-championtier-down.png
│   │       ├── icon-championtier-stay.png
│   │       ├── icon-championtier-up.png
│   │       ├── info-circle-fill.svg
│   │       ├── loading.gif
│   │       ├── minus3.png
│   │       └── three-dots.svg
│   └── json            # 已移动到src/data目录下
│       ├── data.json
│       ├── shishen.json
│       └── shishen_rank.json
├── LICENSE
├── README.md
├── package.json        # node项目的依赖定义入口
├── webpack.config.js   # webpack工具的配置文件
└── yarn.lock           # yarn依赖管理工具产生的文件，自动产生，尽量不要手动修改
```

2. 该项目依赖node，同时也需要yarn依赖管理的工具

相关链接：
 * [Node.js](https://nodejs.org/zh-cn/)
 * [Yarn](https://yarnpkg.com/getting-started/install)
 
3. 日常指令

 *  本地开发预览
```
yarn run start
```
 * 本地测试正式环境
```
yarn run preview
```
 * 打包正式版本
```
yarn run build-prod
```
4. 较先前发布版本的不同

之前的版本是单纯的html+js的文件目录，并不是一个node项目，无法引入一些脚本工具来减少重复代码。

目前的调整是在不改变原有代码的前提下将其转变为一个标准的node项目，由于之前的代码并没有使用vue或者react等框架，本着就简原则采用了webpack手写配置的方式完成了迁移工作，但不保证今后不会引入vue或者react
