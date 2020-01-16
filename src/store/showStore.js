import { RootStore } from './rootStore';
import { action, computed, observable, runInAction } from 'mobx';
import agent from './agent';

export default class ShowStore {
    store: RootStore;

    constructor(store){
        this.store = store;
    }

    @observable showRegistry = new Map();

    @computed get getMovies(){
        return Array.from(this.showRegistry.values());
    }

    @action fetchShows = async () => {
        try {
            const response = await agent.Show.getShows();

            runInAction(() => {
                response.forEach(show => {
                    this.showRegistry.set(show._id, show);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }
}

