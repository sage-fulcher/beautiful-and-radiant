import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Splat } from '../Components/Organisms/SPLAT'
import HomePage from '../Components/Pages/HomePage'
import ItsLayers from '../Components/Pages/ItsLayers'
import Rg53xxDB from '../Components/Pages/Rg53xxDb'
import Sorting from '../Components/Pages/Sorting'
import { TheLocalMeta } from '../Components/Pages/TheLocalMeta'

export const paths = {
  homepage: () => '/',
  sorting: () => '/sorting',
  localMeta: () => '/localMeta',
  splat: () => '/splat',

  inescapable: () => `/layers`,
  roms: () => `/rg53xx`,
}

export function Routes() {
  return (
    <Router>
      <Route path={paths.inescapable()} exact component={ItsLayers} />
      <Route path={paths.homepage()} exact component={HomePage} />
      <Route path={paths.sorting()} exact component={Sorting} />
      <Route path={paths.localMeta()} exact component={TheLocalMeta} />
      <Route path={paths.splat()} exact component={Splat} />
      <Route path={paths.roms()} exact component={Rg53xxDB} />
    </Router>
  )
}
