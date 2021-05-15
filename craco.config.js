const CracoLessPlugin = require('craco-less');
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
    webpack: {
        alias: {
            '@localUtils': pathResolve('src/utils'),
            '@': pathResolve('src')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#00CED1',
                            "@body-background": 'transparent',
                            '@layout-body-background': 'transparent',
                            '@layout-header-background': 'transparent',
                            '@layout-footer-background': 'transparent',
                            '@component-background': 'transparent',
                            '@text-color': '#FFFFFF',
                            '@menu-item-active-bg': '#4B6E8F',
                            '@tooltip-bg': '#87d068',
                            '@modal-footer-bg': 'rgb(69, 71, 71)'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    "homepage": "./"
};