import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Movies from './containers/Movies/Movies';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Route path="/movies" component={Movies} />
        <Route path="/" exact component={Landing} />
      </Layout>
    </Router>
  );
};

export default App;
