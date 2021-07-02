import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { ChinaMapCom } from 'src/components/main/echarts';
import Home from 'src/components/main/home';

const routes = (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/fymap" component={ChinaMapCom}/>
        </Switch>
    </HashRouter>
);

export default routes;