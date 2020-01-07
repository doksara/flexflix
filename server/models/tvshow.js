const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TvShowSchema = new Schema({
    _id: ObjectId,
    title: String,
    tv_station: String,
    duration: Number,
    image: String,
    actors: [String],
    type: [String],
    plot: String,
    episodes: Number,
    tags: [String],
    likes: Number,
    startYear: Number,
    endYear: { type: Number, required: false }
});

const TvShowModel = mongoose.model('TvShow', TvShowSchema);

module.exports = TvShowModel;