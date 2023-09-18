import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import Callback from '../pages/Callback.tsx'
import Personal from '../pages/Personal.tsx'
import TestGuard4 from '../pages/TestGuard4.tsx'
import Basics from '../pages/Basics/index.tsx'

export default function RouterComponent() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/">
          <TestGuard4 />
        </Route>
        <Route exact path="/callback">
          <Callback />
        </Route>
        <Route exact path="/personal">
          <Personal />
        </Route>
        <Route  exact path="/basics">
          <Basics />
        </Route>
      </Switch>
    </Router>
  )
}
