# webpack-knowledge

## 验证方式

### yarn link

使用yarn link做打包资源的可用性验证需要注意:   

1. yarn link是连接的整个项目（根目录），但是当在目标项目中使用yarn link-aaa时，会根据package.json中配置的main、module等字段按需导入资源。 $$