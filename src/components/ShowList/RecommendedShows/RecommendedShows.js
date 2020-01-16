import React, { useState, useEffect } from 'react';
import Show from '../../Show/Show';

const RecommendedShows = (props) => {
    const [shows, setShows] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let url = 'http://localhost:5000/api/shows/recommended';

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
        <div className="shows-grid">
            {shows.map(show => {
                return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
            })}
        </div>
    );
}

export default RecommendedShows;