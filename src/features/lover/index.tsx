import React, { useEffect } from 'react';
import {Route , Switch, useRouteMatch} from 'react-router-dom'
import AddEditPage from './pages/AddEditPage'
import ListPage from './pages/ListPage';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';


export default function Lover() {
  
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(cityActions.fetchCityList());
  },[dispatch]);

  return  (
    <Switch>
      <Route path={match.path} exact>
        <ListPage/>
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
