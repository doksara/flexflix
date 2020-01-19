import React, { useContext, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { Switch, Route } from 'react-router-dom';
import Show from '../Show/Show';
import Filter from '../UI/Filter/Filter';

import './ShowList.scss';
import {RootStoreContext} from "../../store/rootStore";

const ShowList = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { getAllShows, getFavoriteShows, getRecommendedShows, fetchAllShows, fetchFavoriteShows } = rootStore.showStore;

    useEffect(() => {
        fetchFavoriteShows();
        fetchAllShows();
    }, [fetchAllShows, fetchFavoriteShows]);

    return (
        <Switch>
            <Route path="/discover" exact render={() =>
                <div className="show-list">
                    <h1>Discover</h1>
                    <Filter />
                    <div className="show-container">
                        {getAllShows.map(show => {
                            return <Show key={show._id} id={show._id} title={show.title} image={show.image} station={show.tv_station} isLiked={show.isLiked}/>
                        })}
                    </div>
                </div>
            }/>
            <Route path="/recommended" render={() =>
                <div className="show-list">
                    <h1>Recommended</h1>
                    <div className="show-container">
                        {getRecommendedShows.map(show => {
                            return <Show key={show._id} id={show._id} title={show.title} image={show.image} station={show.tv_station} isLiked={show.isLiked} {...show}/>
                        })}
                    </div>
                </div>
            }/>
            <Route path="/favorites" render={() =>
                <div className="show-list">
                    <h1>Favorites</h1>
                    <div className="show-container">
                        {getFavoriteShows.map(show => {
                            return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
                        })}
                    </div>
                </div>
            }/>
        </Switch>
    );
};

export default observer(ShowList);