const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#00CED1',
                            "@body-background": 'transparent',
                            '@layout-body-background': 'rgba(46,103,156,0.4)',
                            '@layout-header-background': 'transparent',
                            '@component-background': 'transparent',
                            '@layout-header-padding': '0 20px',
                            '@menu-inline-submenu-bg': 'transparent',
                            '@text-color': '#FFFFFF',
                            '@layout-header-height': '40px',
                            '@menu-item-active-bg': '#4B6E8F'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    "homepage": "./"
};