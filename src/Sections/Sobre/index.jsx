import React from 'react';
import { Route, Redirect } from "react-router-dom";
import routes from './../../routes';
import { renderRoutes } from "react-router-config";

export default function About(props) {
console.log(routes)
  return (
    <>
      <h1>SOBRE</h1>
      {renderRoutes(routes[0].routes, { someProp: "these extra props are optional" })}
    </>
  );

}

/* 
<Route exact path={props.match.url}>
        <Redirect to={`${props.match.url}/quem-somos`} />
      </Route>
      <Route
        path={`${props.match.url}/quem-somos`}
        render={props => <WhoWeAre />}
      />
*/
