import React, { Component } from 'react';

import Movie from '../../components/Movie/Movie';
import classes from './Movies.css'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: null,
            loading: true
        }
    }

    componentDidMount() {
        fetch('https://movie-app-67d9b.firebaseio.com/tvshows.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    tvshows: data,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        let content = null;

        if (!this.state.loading) {
            const tvshowsArr = Object.values(this.state.tvshows);
            content = tvshowsArr.map(show => {
                return <Movie id={show.id} image={show.image} />;
            })
        }

        return (
            <section className={classes.Movies}>
                {content}
            </section>
        )
    }
}

export default Movies;