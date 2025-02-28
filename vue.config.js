const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
  devServer:{
    // 端口号的配置
		port:8080  
	},
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ],
    devtool: 'source-map'
}
})

