import React from 'react'
import {Nav, NavItem} from 'react-bootstrap'

export function renderNav(router, {baseRoute, items, navProps}) {
  const absRoute = (route) => `${baseRoute}/${route}`
  const selectedKey = items
    .map(({route}) => absRoute(route))
    .filter((route) => router.isActive(route))
    .first()
  return (
    <Nav {...navProps} onSelect={(route) => router.push(route)} activeKey={selectedKey}>
      {items.map(({route, label}) =>
        <NavItem eventKey={absRoute(route)} key={route} >{label}</NavItem>
      )}
    </Nav>
  )
}
