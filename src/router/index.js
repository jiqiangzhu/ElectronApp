import React from 'react';
import {HashRouter, Route, Switch, hashHistory} from 'react-router-dom';
import Home from '../components/home';


const BasicRoute = () => (
    <HashRouter history={hashHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;