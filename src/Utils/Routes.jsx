import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Splat } from '../Components/Organisms/SPLAT'
import HomePage from '../Components/Pages/HomePage'
import ItsLayers from '../Components/Pages/ItsLayers'
import Sorting from '../Components/Pages/Sorting'
import { TheLocalMeta } from '../Components/Pages/TheLocalMeta'

export const paths = {
  homepage: () => '/',
  sorting: () => '/sorting',
  localMeta: () => '/localMeta',
  splat: () => '/splat',

  // EVENT PAGES
  inescapable: () => `/layers`,
}

export function Routes() {
  return (
    <Router>
      <Route path={paths.inescapable()} exact component={ItsLayers} />
      <Route path={paths.homepage()} exact component={HomePage} />
      <Route path={paths.sorting()} exact component={Sorting} />
      <Route path={paths.localMeta()} exact component={TheLocalMeta} />
      <Route path={paths.splat()} exact component={Splat} />
    </Router>
  )
}
