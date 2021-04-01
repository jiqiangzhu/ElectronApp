import { PageHeader } from 'antd';
import React from 'react';

// const routes = [
//     {
//         path: 'index',
//         breadcrumbName: 'First-level Menu',
//     },
//     {
//         path: 'first',
//         breadcrumbName: 'Second-level Menu',
//     },
//     {
//         path: 'second',
//         breadcrumbName: 'Third-level Menu',
//     },
// ];


class Header extends React.Component {
    componentBeforeMount() {
        console.log();
    }
    render() {
        return (
            <PageHeader
                title="Title"
                className="site-page-header"
                avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            >
            </PageHeader>
        )
    }
}
export {
    Header as CustomHeader
}