import React, { useState, useEffect } from 'react';
import Show from '../../components/Show/Show';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Shows.scss';

const Shows = props => {
  const [shows, setShows] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = 'http://localhost:5000/api/shows';

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setShows(json);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return <p>I am loading TV shows...</p>;
  }

  return (
    <div className="shows-layout">
      <Sidebar />
      <div className="shows-container">
        {shows.map(show => {
          return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
        })}
      </div>
    </div>
  );
}

export default Shows;