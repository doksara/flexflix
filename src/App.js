import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login'
import withAuth from './hoc/withAuth';

import './App.scss';

const App = props => {
  return (
    <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/discover" component={withAuth(Main)} />
          <Route path="/" component={withAuth(Main)} />
        </Switch>
    </Layout>
  );
}

export default App;
