import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export const MakeRouteWithSubRoutes = route => {
  const isAuth = localStorage.getItem('isAuth');
  //console.log(isAuth)
  if(isAuth){
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component { ...props} routes={route.routes} />
        )}
      />
    );
  }else{
    if(route.protected){
      return <Redirect to="/" />
    }else{
      return (
        <Route
          path={route.path}
          render={props => (
            <route.component { ...props} routes={route.routes} />
          )}
        />
      );
    }
  }
}