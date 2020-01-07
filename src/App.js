import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Shows from './containers/Shows/Shows';
import Login from './containers/Login/Login'
import withAuth from './hoc/withAuth';

import './App.scss';

const App = props => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/shows" component={withAuth(Shows)} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
