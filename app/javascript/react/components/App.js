import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga';

import HomeContainer from '../containers/HomeContainer'
import EntreePickerContainer from '../containers/EntreePickerContainer'
import PopularEntreeContainer from '../containers/PopularEntreeContainer'
import EntreeHistoryContainer from '../containers/EntreeHistoryContainer'
import UserExperienceContainer from '../containers/UserExperienceContainer'

export const App = (props) => {
  useEffect(() => {
    ReactGA.initialize('UA-166870847-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/entree_picker" component={EntreePickerContainer}/>
          <Route exact path="/picked_entree" component={PopularEntreeContainer}/>
          <Route exact path="/entree_history" component={EntreeHistoryContainer}/>
          <Route exact path="/your_experience" component={UserExperienceContainer}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
