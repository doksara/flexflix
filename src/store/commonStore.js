import { action, computed } from "mobx";

export default class CommonStore{
    constructor(store){
        this.store = store;
    }

    @computed get jwtToken() {
        return localStorage.getItem('jwt');
    }

    @action setJWTToken = (token) => {
        if (token){
            localStorage.setItem('jwt', token);
        }
        else{
            localStorage.removeItem('jwt');
        }
    }
}