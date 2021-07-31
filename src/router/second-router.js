import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { ChinaMapCom } from 'src/components/main/echarts';
import MenuBar from 'src/components/main/menu-bar';
import Recommend from 'src/components/main/recommend';

const routes2 = (
    <HashRouter>
        {/* <Switch> */}
        <Route component={MenuBar} />
        <Route path="/home" component={Recommend} />
        <Route exact path="/fymap" component={ChinaMapCom} />

        {/* </Switch> */}
    </HashRouter>
);

export default routes2;