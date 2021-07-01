import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from 'src/components/main/home';

const routes = (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    </HashRouter>
);

export default routes;