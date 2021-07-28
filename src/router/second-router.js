import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import MenuBar from 'src/components/main/menu-bar';

const routes2 = (
    <HashRouter>
        {/* <Switch> */}
        <Route component={MenuBar} />
        {/* </Switch> */}
    </HashRouter>
);

export default routes2;