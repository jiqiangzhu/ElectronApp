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
                            // '@layout-body-background': 'rgba(59,59,77,0.2)',
                            '@layout-body-background': 'rgba(59,59,77)',
                            // '@layout-header-background': 'rgba(59,59,77,0.8)',
                            '@layout-header-background': 'rgba(59,59,77,1)',
                            '@layout-footer-background': 'transparent',
                            '@component-background': 'transparent',
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