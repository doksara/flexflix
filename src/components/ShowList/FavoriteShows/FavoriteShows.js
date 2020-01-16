import React, { useState, useEffect } from 'react';
import Show from '../../Show/Show';

const FavoriteShows = (props) => {
    const [shows, setShows] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    console.log("ee");

    useEffect(() => {
        let user = localStorage.getItem('user');
        let url = `http://localhost:5000/api/shows/favorites/${user}`;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            setShows(json);
            setIsLoading(false);
        }).catch(err => console.log(err));

    }, []);

    if (isLoading) {
        return <p>I am loading TV shows...</p>;
    }

    return (
        <div className="shows-grid">
            {shows.map(show => {
                return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
            })}
        </div>
    );
}

export default FavoriteShows;