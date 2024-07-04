import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header';
import Body from '../Body';
export default function ViewContent() {
  const location = useLocation();
  console.log("--->",location);
  return (
    <Fragment>
      <Header/>
      <Body/>
    </Fragment>
  )
}
