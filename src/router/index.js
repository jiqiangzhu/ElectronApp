import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import FooterCom from 'src/components/footer';
import { CustomHeader } from 'src/components/header';
// import { ChinaMapCom } from 'src/components/main/echarts';
import Home from 'src/components/main/home';

const routes = (
    <HashRouter>
        {/* <Switch> */}
        <Route component={CustomHeader} />
        <Route path="/" component={Home} />
        {/* <Route path="/" component={Home}>
            <Route component={MenuBar} />
        </Route> */}
        {/* <Route component={MenuBar} /> */}
        {/* <Route exact path="/fymap" component={ChinaMapCom} /> */}
        <Route component={FooterCom} />
        {/* </Switch> */}
    </HashRouter>
);

export default routes;