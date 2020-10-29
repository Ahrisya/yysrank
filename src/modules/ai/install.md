---
title: 安装
categories: install
---
因为Tensorflow很容易和其他包冲突，所以如果已经安装了各种python包的阴阳师大人们推荐使用 **pipenv** 或者 **virtualenv** 搭个虚拟环境再装。

### Requirements
- python >= 3.6， 官网：[https://www.python.org/](https://www.python.org/)

- PyQt5, 安装方法：`pip install PyQt5`

- TensorFlow >= 2.0（无需GPU版本），官网：[https://tensorflow.google.cn/](https://tensorflow.google.cn/)，安装方法： `pip install tensorflow`

### PS:
Tensorflow文件很大，在国内的话可能会因为网络问题下到一半网就断了。所以推荐国内的阴阳师大人们使用国内镜像源，使用方法：

`pip install tensorflow -i 镜像源 `

国内镜像源：

- 阿里云： https://mirrors.aliyun.com/pypi/simple/
- 中国科学技术大学（母校嘤嘤嘤）： https://pypi.mirrors.ustc.edu.cn/simple/
- 豆瓣： https://pypi.douban.com/simple/
- 清华大学： https://pypi.tuna.tsinghua.edu.cn/simple/

PyQt5也可以用相同方法从国内镜像下载。