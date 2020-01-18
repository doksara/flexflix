import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const Show = {
    getAllShows: () => {
        return axios.get(`/shows`)
                    .then(response => response.data);
    },

    getFavoriteShows: (userId) => {
        return axios.get(`/shows/favorites/${userId}`)
                    .then(response => response.data);
    },

    likeShow: (username, showId) => {
        return axios.post(`/users/addFavorite`, {
            user: username,
            show: showId
                  }).then(response => response.data);
    },

    unlikeShow: (username, showId) => {
        return axios.post(`/users/removeFavorite`, {
            user: username,
            show: showId
                  }).then(response => response.data);
    }
};

export default {
    Show
}