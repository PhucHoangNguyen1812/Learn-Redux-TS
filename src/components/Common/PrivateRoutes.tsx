import React from 'react';
//import { RouteProps } from 'react-router';

import { Redirect, Route, RouteProps} from 'react-router-dom';

export interface PrivateRoutesProps{

}

export function PrivateRoutes(props : RouteProps) {
  
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    console.log(isLoggedIn)
    if(!isLoggedIn) return <Redirect to = "/login"/>;
    return <Route {...props} />

}
