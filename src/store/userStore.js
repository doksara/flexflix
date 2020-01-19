import { observable, action, runInAction, computed } from "mobx";
import agent from "./agent";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { history } from "../index";

export default class UserStore {
    constructor(store) {
        this.store = store;
    }

    @observable user = null;

    @action login = async (loginCredentials) => {
        try {
            const response = await agent.User.login(loginCredentials);
            runInAction(() => {
                this.store.commonStore.setJWTToken(response.token);
                this.user = this.getUserFromToken(response.token);
                history.push('/discover');
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action register = async (userData) => {
        try {
            await agent.User.register(userData);
            toast.info("User registered");
        } catch (error) {
            console.log(error);
        }
    };

    @action getUser = () => {
        let token = this.store.commonStore.jwtToken;
        try {
            this.user = this.getUserFromToken(token);
        } catch (error) {
            this.removeAllData();
        }
    };

    @action logout = () => {
        history.push('/login');

        this.removeAllData();
        this.store.showStore.restart();
        this.user = null;
    };

    @computed get userLoggedIn() {
        if (!this.user) {
            this.getUser();
        }

        return !!this.user;
    }

    removeAllData() {
        this.store.commonStore.setJWTToken(null);
    }

    getUserFromToken(token) {
        if (!token) {
            throw new Error("Token je null");
        }
        try {
            var decoded = jwt_decode(token);
            return {
                id: decoded.nameid,
                username: decoded.unique_name,
                role: decoded[this.roleToken]
            };
        } catch (error) {
            throw new Error("Pogrešan format tokena");
        }
    }
}
