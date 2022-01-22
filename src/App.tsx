import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, PrivateRoutes } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';



function App() {
   return (
    <>
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
