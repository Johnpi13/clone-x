const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Para guardar la fecha de creación del tweet
    }
});

// Exportar el modelo
const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
