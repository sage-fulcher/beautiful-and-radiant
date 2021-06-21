import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from '../Components/Pages/HomePage'
import ItsLayers from '../Components/Pages/ItsLayers'
import Sorting from '../Components/Pages/Sorting'

export const paths = {
  homepage: () => '/',
  sorting: () => '/sorting',

  // EVENT PAGES
  inescapable: () => `/layers`,
}

export function Routes() {
  return (
    <Router>
      <Route path={paths.inescapable()} exact component={ItsLayers} />
      <Route path={paths.homepage()} exact component={HomePage} />
      <Route path={paths.sorting()} exact component={Sorting} />
    </Router>
  )
}
