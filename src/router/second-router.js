import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ChinaMapCom } from 'src/components/main/echarts';
import MenuBar from 'src/components/main/menu-bar';
import Recommend from 'src/components/main/recommend';
import NotFound from 'src/components/NotFound';

const routes2 = (
    <HashRouter>
        <Route component={MenuBar} />
        <Switch>
            <Route path="/home" component={Recommend} />
            <Route exact path="/fymap" component={ChinaMapCom} />
            <Route component={NotFound} />
        </Switch>
    </HashRouter>
);

export default routes2;