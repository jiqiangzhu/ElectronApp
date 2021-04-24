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
                            '@layout-body-background': 'rgba(46,103,156,0.2)',
                            '@layout-header-background': 'rgba(46,103,156,0.8)',
                            '@layout-footer-background': 'transparent',
                            '@component-background': 'transparent',
                            '@layout-header-padding': '0 20px',
                            '@menu-inline-submenu-bg': 'transparent',
                            '@text-color': '#FFFFFF',
                            '@menu-item-active-bg': '#4B6E8F',
                            '@page-header-back-color': '#fff;',
                            '@table-bg': 'transparent',
                            '@table-header-bg': 'transparent',
                            '@table-header-sort-bg': 'transparent',
                            '@table-body-sort-bg': 'transparent',
                            '@table-row-hover-bg': 'transparent',
                            '@table-selected-row-color': 'transparent',
                            '@table-selected-row-bg': 'transparent'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    "homepage": "./"
};