// 按需引入
// const {override,fixBabelImports,addLessLoader} =require("customize-cra")

// 自定义主题样式
const CracoLessPlugin=require("craco-less");

module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#1da57a' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };

// module.exports=override(
//     // 针对antd实现按需打包：根据import来打包
//     fixBabelImports('import',{
//         libraryName:"antd",
//         libraryDirectory:"es",
//         style:"css",//自动打包相关的样式
//     })
// )