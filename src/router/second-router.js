import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Clock from 'src/components/main/canvas'
import { ChinaMapCom } from 'src/components/main/echarts'
import LeaderBoard from 'src/components/main/leader-board'
import MenuBar from 'src/components/main/menu-bar'
import Movie from 'src/components/main/movie'
import Recommend from 'src/components/main/recommend'
import NotFound from 'src/components/NotFound'

const routes2 = (
  <HashRouter>
    <Route component={MenuBar} />
    <Switch>
      <Route path="/home" component={Recommend}></Route>
      <Route exact path="/fymap" component={ChinaMapCom} />
      <Route exact path="/movie" component={Movie} />
      <Route exact path="/rank" component={LeaderBoard} />
      <Route exact path="/clock" component={Clock} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>
)

export default routes2
