import {action, computed, observable, runInAction} from 'mobx';
import agent from './agent';

export default class ShowStore {
    constructor(store){
        this.store = store;
    }

    @observable allShowsRegistry = new Map();
    @observable favoriteShowsRegistry = new Map();

    @computed get getAllShows(){
        return Array.from(this.allShowsRegistry.values());
    }

    @computed get getRecommendedShows(){
        const tempAll = [...Array.from(this.allShowsRegistry.values())];
        const tempFavorites = [...Array.from(this.favoriteShowsRegistry.values())];

        const newArr = tempAll.reduce((total, item) => {

            let newItem = {
                ...item,
                connections: 0,
                actors: [...item.actors],
                type: [...item.type],
                tags: [...item.tags]
            };

            tempFavorites.forEach(show => {
                newItem.connections += newItem.actors.filter(i => show.actors.includes(i)).length;
                newItem.connections += newItem.type.filter(i => show.type.includes(i)).length;
                newItem.connections += newItem.tags.filter(i => show.tags.includes(i)).length;
            });

            return total.concat(newItem);
        }, []);

        return newArr.sort((x, y) => {
            if (x.connections > y.connections){
                return -1;
            }

            if (x.connections < y.connections){
                return 1;
            }

            return 0;
        });
    }

    @computed get getFavoriteShows(){
        return Array.from(this.favoriteShowsRegistry.values());
    }

    @action fetchAllShows = async () => {
        try {
            const response = await agent.Show.getAllShows();

            runInAction(() => {
                response.forEach(show => {
                    show.isLiked = !!(this.favoriteShowsRegistry.get(show._id));
                    this.allShowsRegistry.set(show._id, show);
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action fetchFavoriteShows = async () => {
        try {
            const username = localStorage.getItem('user');
            const response = await agent.Show.getFavoriteShows(username);

            runInAction(() => {
                response.forEach(show => {
                    this.favoriteShowsRegistry.set(show._id, show);
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action likeShow = async (showId) => {
        console.log(showId);
        try {
            const show = this.allShowsRegistry.get(showId);
            const username = localStorage.getItem('user');

            if (!show.isLiked){
                const response = await agent.Show.likeShow(username, showId);

                runInAction(() => {
                    if (response.message){
                        show.isLiked = true;
                        this.favoriteShowsRegistry.set(showId, show);
                    }
                })
            } else {
                const response = await agent.Show.unlikeShow(username, showId);

                runInAction(() => {
                    if (response.message){
                        show.isLiked = false;
                        this.favoriteShowsRegistry.delete(showId);
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

