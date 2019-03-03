const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    length: { type: Number, required: false },
    artist: { type: String, required: false },
    genre: { type: String, required: false },
    path: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Music', musicSchema);