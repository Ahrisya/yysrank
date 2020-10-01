// vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .entry('chunk-common')
            .add('./data/data.json')
            .add('./data/shishen.json')
            .add('./data/shishen_rank.json')
            .end()

        config.resolve
            .alias
            .set('vue$', 'vue/dist/vue.esm.js')
        // .set('moment', 'moment/min/moment.min.js')
        ;
        // const svgRule = config.module.rule('svg');
        // svgRule.uses.clear();
        // svgRule.use('url-loader')
        //     .loader('url-loader')
        //     .after('svg-transform-loader')
        //     .loader('svg-transform-loader')
        //     .end()

        // scss 需要处理svg
        const Mode = require('frontmatter-markdown-loader/mode')

        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('frontmatter-markdown-loader')
            .loader('frontmatter-markdown-loader')
            .tap(options => {
                return {
                    mode: [Mode.HTML] // 这是默认值
                }
            })

        config.plugin('html').tap(args => args.map(arg => ({...arg, title: '阴阳师斗技阵容胜率查询'})))

        // 分析包结构
        // config.plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

        // 目前没有需要CDN加速的模块
        /**
        config.plugin('webpack-cdn-plugin')
            .use(require('webpack-cdn-plugin'),
                [
                    {
                        //             prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
                        modules: [
                            // {
                            //     name: "jquery",
                            //     path: 'dist/jquery.min.js'
                            // }, {
                            //     name: "bootstrap",
                            //     paths: [
                            //         'dist/js/bootstrap.bundle.min.js',
                            //         'dist/js/bootstrap.min.js',
                            //     ],
                            //     style: 'dist/css/bootstrap.min.css'
                            // }, {
                            //     name: "bootstrap-select",
                            //     paths: [
                            //         'dist/js/bootstrap-select.min.js',
                            //         'dist/js/i18n/defaults-zh_CN.min.js',
                            //     ],
                            //     style: 'dist/css/bootstrap-select.min.css'
                            // }, {
                            //     name: "bootstrap-table",
                            //     path: "dist/bootstrap-table.min.js",
                            //     style: "dist/bootstrap-table.min.css"
                            // }, {
                            //     name: "toastr",
                            //     path: "build/toastr.min.js",
                            //     style: "build/toastr.min.css"
                            // }
                        ],
                    }
                ]
            )
        **/
    }
};
