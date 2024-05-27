const mongoose = require('mongoose');

const FormulaireSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    cne: {
        type: String
    },
    module1: {
        type: Number
    },
    module2: {
        type: Number
    },
    module3: {
        type: Number
    }
});

const Formulaire = mongoose.model('Formulaire', FormulaireSchema);

module.exports = Formulaire;
