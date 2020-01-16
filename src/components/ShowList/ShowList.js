import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Show from '../Show/Show';
import AllShows from './AllShows/AllShows';
import RecommendedShows from './RecommendedShows/RecommendedShows';
import FavoriteShows from './FavoriteShows/FavoriteShows';
import withAuth from '../../hoc/withAuth';

import './ShowList.scss';

class ShowList extends Component {
    constructor(props){
        super(props);
        this.state = {
            likedShows: []
        }
    }

    render () {
        return (
            <div className="shows-container">
            {this.props.allShows.map(show => {
                return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
            })}
            </div>
        );
    }
}

/*
<Switch>
    <Route path="/discover" exact component={withAuth(AllShows)} />
    <Route path="/recommended" component={withAuth(RecommendedShows)} />
    <Route path="/favorites" component={withAuth(FavoriteShows)} />
</Switch>
*/



export default ShowList;