const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    note1: {
        type: Number,
        default: 0
    },
    note2: {
        type: Number,
        default: 0
    },
    moyenne: {
        type: Number,
        default: function() {
            return (this.note1 + this.note2) / 2;
        }
    },
    longitude: {
        type: Number,
        required: true,
        // min: -180,
        // max: 180
    },
    latitude: {
        type: Number,
        required: true,
        // min: -90,
        // max: 90
    }
});

const Etudiant = mongoose.model('Etudiant', EtudiantSchema);

module.exports = Etudiant;
