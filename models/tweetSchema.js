const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Cambia esto a String si estás usando el nombre de usuario
        required: true,
        ref: 'User' // Cambia esto al nombre de tu modelo de usuario si es necesario
    },
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
