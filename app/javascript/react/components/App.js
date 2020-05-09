import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomeComponent from './HomeComponent'
import EntreePickerContainer from '../containers/EntreePickerContainer'
import PopularEntreeContainer from '../containers/PopularEntreeContainer'
import EntreeHistoryContainer from '../containers/EntreeHistoryContainer'

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/entree_picker" component={EntreePickerContainer}/>
          <Route exact path="/popular_entree" component={PopularEntreeContainer}/>
          <Route exact path="/entree_history" component={EntreeHistoryContainer}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
