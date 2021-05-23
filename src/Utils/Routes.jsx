import React from 'react'
import { BrowserRouter as Router, Redirect, Route, useLocation } from 'react-router-dom'
import ItsLayers from '../Components/Pages/ItsLayers'
import HomePage from '../Components/Pages/HomePage'

export const paths = {
  homepage: () => '/',

  // EVENT PAGES
  inescapable: () => `/layers`,
}

export function Routes() {
  return (
    <Router>
      <Route path={paths.inescapable()} exact component={ItsLayers} />
      <Route path={paths.homepage()} exact component={HomePage} />
    </Router>
  )
}

export default {
  Routes,
  paths,
}
