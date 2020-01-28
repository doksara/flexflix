import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login'
import Logout from './components/Logout/Logout';
import ShowDetails from './containers/ShowDetails/ShowDetails';
import withAuth from './hoc/withAuth';

import './App.scss';

const App = props => {
  return (
    <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/discover" exact component={withAuth(Main)} />
          <Route path="/show/:id" exact component={withAuth(ShowDetails)} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" component={withAuth(Main)} />
        </Switch>
    </Layout>
  );
};

export default withRouter(App);
