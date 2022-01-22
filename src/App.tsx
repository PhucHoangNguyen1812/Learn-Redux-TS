import React, { useEffect } from 'react';
import cityApi from './api/cityApi';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/Layout';
import { NotFound, PrivateRoutes } from './components/Common';
import { useAppDispatch } from './app/hooks';
import { Button } from '@mui/material';
import { authActions } from './features/auth/authSlice';



function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then(response => console.log(response));
  });

  return (
    <>
    <Button variant ='contained' color='primary' onClick={() => dispatch(authActions.logout())}>
      Đăng Xuất
    </Button>
     <div>
        <Switch>
          <Route path= "/login">
              <LoginPage/>
          </Route>
          <PrivateRoutes path= "/admin">
              <AdminLayout/>
          </PrivateRoutes>
          <Route>
              <NotFound/>
          </Route>
        </Switch>
      </div>
    </>
     
  );
}

export default App;
