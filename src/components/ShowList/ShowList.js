import React, { useContext, useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { Switch, Route } from 'react-router-dom';
import Show from '../Show/Show';

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
        <div className="shows-container">
            <Switch>
                <Route path="/discover" exact render={() =>
                    getAllShows.map(show => {
                        return <Show key={show._id} id={show._id} title={show.title} image={show.image} station={show.tv_station} isLiked={show.isLiked}/>
                    })
                }/>
                <Route path="/recommended" render={() =>
                    getRecommendedShows.map(show => {
                        return <Show key={show._id} id={show._id} title={show.title} image={show.image} station={show.tv_station} isLiked={show.isLiked} {...show}/>
                    })
                }/>
                <Route path="/favorites" render={() =>
                    getFavoriteShows.map(show => {
                        return <Show key={show._id} title={show.title} image={show.image} station={show.tv_station} />
                })
                }/>
            </Switch>
        </div>
    );
};

export default observer(ShowList);