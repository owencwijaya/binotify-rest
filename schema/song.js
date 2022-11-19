const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    judul: {
        type: String,
        required: true
    },
    id_penyanyi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    audio_path: {
        type: String,
        required: true
    }
})

var Song = mongoose.model('Song', songSchema);
module.exports = Song