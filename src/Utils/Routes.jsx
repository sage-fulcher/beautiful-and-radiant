import React from 'react'
import { BrowserRouter as Router, Redirect, Route, useLocation } from 'react-router-dom'
import NoEscape from '../Components/Pages/NoEscape'
import HomePage from '../Components/Pages/HomePage'

export const paths = {
  homepage: () => '/',

  // EVENT PAGES
  inescapable: () => `/inescapable`,
}

export function Routes() {
  return (
    <Router>
      <Route path={paths.inescapable()} exact component={NoEscape} />
      <Route path={paths.homepage()} exact component={HomePage} />
    </Router>
  )
}

export default {
  Routes,
  paths,
}
