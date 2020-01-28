import React, { useContext, useEffect} from 'react'
import Tag from '../../components/UI/Tag/Tag';
import Button from '../../components/UI/Button/Button';
import { observer } from "mobx-react-lite";
import { withRouter } from 'react-router-dom';
import {RootStoreContext} from "../../store/rootStore";
import './ShowDetails.scss';
import Show from "../../components/Show/Show";

const ShowDetails = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { getShow, selectedShow, getSimilarShows, restart } = rootStore.showStore;

    useEffect(() => {
        if (props.match.params.id){
            getShow(props.match.params.id);
        }

        return () => {
            restart();
        };

    }, [getShow, restart]);

    return (selectedShow ?
        <section className="show-details">
            <div className="details-wrapper">
                <div className="details-heading">
                    <h1>{selectedShow.title} ({selectedShow.startYear} - {selectedShow.endYear})</h1>
                    <Button clicked={ () => props.history.goBack() } type="button">Back</Button>
                </div>
                <div className="details-image">
                    <img src={ require(`../../assets/posters/${selectedShow.image}`)} alt="poster" />
                </div>
                <div className="details-text">
                    <p>{selectedShow.tv_station} ({selectedShow.duration}, {selectedShow.episodes} episodes)</p>
                    <p style={ { textTransform: "uppercase", fontWeight: "bold", fontSize: "1.4rem" } }>
                        Genre: {selectedShow.type.map((item, ind) => item + (ind !== selectedShow.type.length - 1 ? ', ' : '') )}
                    </p>
                    <p>
                        <strong>Actors:</strong> {selectedShow.actors.map((item, ind) => item + (ind !== selectedShow.actors.length - 1 ? ', ' : '') )}
                    </p>
                    <p>{selectedShow.plot}</p>
                    <p>Tags: </p>
                    <p>{selectedShow.tags.map(item => <Tag>{item}</Tag>)}</p>
                </div>
                <div className="details-similar-shows">
                    <div>
                        <h2>See similar TV shows</h2>
                        <div className="similar-shows-wrapper">
                            {getSimilarShows.map(show => {
                                return <Show key={show._id} id={show._id} title={show.title} image={show.image} station={show.tv_station} isLiked={show.isLiked}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section> : <p>Loading..</p>
    );
};

export default withRouter(observer(ShowDetails));