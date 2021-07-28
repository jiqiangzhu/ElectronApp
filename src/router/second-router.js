import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { ChinaMapCom } from 'src/components/main/echarts';
import MenuBar from 'src/components/main/menu-bar';

const routes2 = (
    <HashRouter>
        {/* <Switch> */}
        <Route component={MenuBar} />
        <Route exact path="/fymap" component={ChinaMapCom} />
        {/* </Switch> */}
    </HashRouter>
);

export default routes2;