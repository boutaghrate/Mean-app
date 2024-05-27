const express = require('express');
const router = express.Router();
const Formulaire = require('../models/formulaire');

router.post('/ajouter', (req, res) => {
    const data = req.body;
    const nouveauFormulaire = new Formulaire({
        nom: data.nom,
        prenom: data.prenom,
        cne: data.cne,
        module1: data.module1,
        module2: data.module2,
        module3: data.module3
    });

    nouveauFormulaire.save()
        .then(resultat => {
            res.status(201).json({ message: 'Données du formulaire enregistrées avec succès', formulaire: resultat });
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement des données du formulaire :', error);
            res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement des données du formulaire' });
        });
});

// Route pour récupérer la liste des formulaires
router.get('/liste', (req, res) => {
    Formulaire.find()
        .then(formulaires => {
            res.status(200).json(formulaires);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la liste des formulaires :', error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la liste des formulaires' });
        });
});

router.put('/update/:id', (req, res) => {
    const formulaireId = req.params.id;
    const newData = req.body;

    Formulaire.findByIdAndUpdate(formulaireId, newData, { new: true })
        .then(updatedFormulaire => {
            if (!updatedFormulaire) {
                return res.status(404).json({ message: 'Formulaire non trouvé' });
            }
            res.status(200).json({ message: 'Formulaire mis à jour avec succès', formulaire: updatedFormulaire });
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour du formulaire :', error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du formulaire' });
        });
});

module.exports = router;
