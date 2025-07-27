# 基于组件库的webpack配置

当前文件夹中的配置均基于组件库打包，**basic-config** 是最开始的基础版本，其他各个文件中包含了对于不同模块和场景的优化。

## [basic-config.js](./basic-config.js)
当前文件中，是最基础的组件库打包配置，主要功能如下：
   1. 根据/src下的目录生成打包文件
   2. 处理js兼容
   3. 处理tsx转换为基础js
   4. 处理文件和图片

## [better-ts-config](./better-ts-config.js)
基于**basic-config** 更优的ts处理方式