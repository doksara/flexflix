import React from 'react';
import ShowList from '../../components/ShowList/ShowList';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Main.scss';

const Main = () => {
  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <ShowList />
    </div>
  );
};

export default Main;