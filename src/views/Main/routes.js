import React from 'react'
import {Route, Redirect} from 'react-router'
import Container from './Container'

import Map from './Map/Map'
import Detail from './Detail/Detail'

export const makeMainRoutes = () => {
  return (
    <Route path="" component={Container}>
      <Route path="map" component={Map}>
      <Route path="detail/:placeId"
        component={Detail} />
      </Route>

      <Redirect from="*" to="/map" />
    </Route>
  )
}

export default makeMainRoutes
