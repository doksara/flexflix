import React, { useEffect, useContext } from 'react';
import ShowList from '../../components/ShowList/ShowList';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { RootStoreContext } from '../../store/rootStore';

import './Main.scss';

const Main = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchShows } = rootStore.showStore;

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <ShowList />
    </div>
  );
}

export default Main;