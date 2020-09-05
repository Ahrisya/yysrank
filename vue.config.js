// vue.config.js
module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule.use('url-loader')
            .loader('url-loader')
            .after('svg-transform-loader')
            .loader('svg-transform-loader')
            .end()

        // scss 需要处理svg

        // config.plugins

        // config.plugin('html').tap(args => {
        //     console.log(args);
        //     return [
        //         //     {
        //         //     title: '阴阳师斗技阵容胜率查询'
        //         // }
        //     ];
        // })

        config.plugin('webpack-cdn-plugin')
            .use(require('webpack-cdn-plugin'),
                [{
                    prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
                    modules: [
                        {
                            name: "jquery",
                            path: 'dist/jquery.min.js'
                        }, {
                            name: "bootstrap",
                            paths: [
                                'dist/js/bootstrap.bundle.min.js',
                                'dist/js/bootstrap.min.js',
                            ],
                            style: 'dist/css/bootstrap.min.css'
                        }, {
                            name: "bootstrap-select",
                            paths: [
                                'dist/js/bootstrap-select.min.js',
                                'dist/js/i18n/defaults-zh_CN.min.js',
                            ],
                            style: 'dist/css/bootstrap-select.min.css'
                        }, {
                            name: "bootstrap-table",
                            path: "dist/bootstrap-table.min.js",
                            style: "dist/bootstrap-table.min.css"
                        }, {
                            name: "toastr",
                            path: "build/toastr.min.js",
                            style: "build/toastr.min.css"
                        }
                    ]
                }]
            );
    }
};
