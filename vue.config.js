const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    publicPath: "./",
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/assets/style/common.less")]
        }
    },
    // publicPath:"https://public.esep.cn",
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/': {
                // target: 'http://59.110.153.129:8080', // 测试环境
                // target: 'http://39.106.231.193:8080', // 测试环境
                // target: 'https://hive.esep.cn', // 生产环境
                target: 'https://cp1059.sygnew.com',
                pathRewrite: {
                    "^/": "/"
                }
            },
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    // 部署优化
    configureWebpack: {
        // 使用CDN
        externals: {
            vue: 'Vue',
            'vue-i18n': 'VueI18n',
            axios: 'axios',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            'view-design': 'iview',
            echarts: 'echarts',
            'vue-apexcharts': 'VueApexCharts',
            xlsx: 'XLSX',
            dplayer: 'DPlayer',
            'print-js': 'printJS',
            'vue-json-pretty': 'VueJsonPretty',
            'vue-lazyload': 'VueLazyload',
            'js-cookie': 'Cookies',
            stompjs: 'Stomp',
            'sockjs-client': 'SockJS',
            vuedraggable: 'vuedraggable',
            viewerjs: 'Viewer'
        },
        // GZIP压缩
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240, // 对超过10k文件压缩
                deleteOriginalAssets: false,
            }),
            new CopyWebpackPlugin({
                patterns: [{
                    from: "./static",
                    to: 'static'
                }]
            })
        ]
    },
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')

    }
}