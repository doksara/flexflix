const mongoose = require('mongoose');
const crypto = require('crypto');
const { TvShowModel } = require('./tvshow.js');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const hash = (password) => {
    const secret = 'tbp';

    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

    return hash;
}

const UserSchema = new Schema({
    _id: ObjectId,
    username: { type: String, required: true, unique: true },
    password: String,
    favorites: [{ type: ObjectId, ref: TvShowModel }]
});

UserSchema.pre('save', function (next) {
    const document = this;
    const hashedPassword = hash(document.password);

    document.password = hashedPassword;

    next();
});

UserSchema.methods.isCorrectPassword = function (pw) {
    return hash(pw) == this.password;
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;