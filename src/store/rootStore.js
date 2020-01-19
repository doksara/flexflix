import { createContext } from 'react';
import ShowStore from './showStore';
import UserStore from './userStore';
import CommonStore from "./commonStore";

export class RootStore { 
    constructor(){
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.showStore = new ShowStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());