const express = require('express');
const router = express.Router();
const Etudiant = require('../models/etudiant');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// router.post('/register', (req, res) => {
//     let data = req.body;
//     let etudiant = new Etudiant(data);

//     // Génération du sel pour le hachage du mot de passe
//     const salt = bcrypt.genSaltSync(10);

//     // Hachage du mot de passe avec le sel généré
//     etudiant.password = bcrypt.hashSync(data.password, salt);

//     etudiant.save()
//         .then((saved) => {
//             res.status(200).send(saved);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
// });




// router.post('/register', (req, res) => {
//     let data = req.body;
    
//     // Vérification que toutes les données requises sont présentes
//     if (!data.id || !data.nom || !data.login || !data.password || !data.note1 || !data.note2 || !data.longitude || !data.latitude) {
//         return res.status(400).send("Toutes les données sont requises");
//     }

//     // Hachage du mot de passe avec bcrypt
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(data.password, salt);
    
//     // Création d'un nouvel étudiant avec le mot de passe haché
//     let etudiant = new Etudiant({
//         id: data.id,
//         nom: data.nom,
//         login: data.login,
//         password: hashedPassword,
//         note1: data.note1,
//         note2: data.note2,
//         moyenne: (data.note1 + data.note2) / 2, // Calcul de la moyenne
//         longitude: data.longitude,
//         latitude: data.latitude
//     });

//     // Enregistrement de l'étudiant dans la base de données
//     etudiant.save()
//         .then((saved) => {
//             res.status(200).send(saved);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
// });



// router.post('/register', (req, res) => {
//     let data = req.body;
    
//     // Vérification que toutes les données requises sont présentes
//     if (!data.id || !data.nom || !data.login || !data.password || !data.longitude || !data.latitude) {
//         return res.status(400).send("Toutes les données sont requises");
//     }

//     // Hachage du mot de passe avec bcrypt
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(data.password, salt);
    
//     // Assign default values for note1, note2, and moyenne if not provided
//     const note1 = data.note1 || 0;
//     const note2 = data.note2 || 0;
//     const moyenne = (note1 + note2) / 2;

//     // Création d'un nouvel étudiant avec le mot de passe haché
//     let etudiant = new Etudiant({
//         id: data.id,
//         nom: data.nom,
//         login: data.login,
//         password: hashedPassword,
//         note1: note1,
//         note2: note2,
//         moyenne: moyenne, // Calcul de la moyenne
//         longitude: data.longitude,
//         latitude: data.latitude
//     });

//     // Enregistrement de l'étudiant dans la base de données
//     etudiant.save()
//         .then((saved) => {
//             res.status(200).send(saved);
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
// });




router.post('/register', (req, res) => {
    let data = req.body;
    
    // Vérification que toutes les données requises sont présentes
    if (!data.id || !data.nom || !data.login || !data.password || !data.longitude || !data.latitude) {
        return res.status(400).send("Toutes les données sont requises");
    }

    // Hachage du mot de passe avec bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    
    // Assignation de valeurs par défaut pour note1, note2 et moyenne si non fournies
    const note1 = data.note1 || 0;
    const note2 = data.note2 || 0;
    const moyenne = (note1 + note2) / 2; // Calcul de la moyenne

    // Création d'un nouvel étudiant avec le mot de passe haché et la moyenne calculée
    let etudiant = new Etudiant({
        id: data.id,
        nom: data.nom,
        login: data.login,
        password: hashedPassword,
        note1: note1,
        note2: note2,
        moyenne: moyenne, // Assignation de la moyenne calculée
        longitude: data.longitude,
        latitude: data.latitude
    });

    // Enregistrement de l'étudiant dans la base de données
    etudiant.save()
        .then((saved) => {
            res.status(200).send(saved);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});



router.post("/login",(req,res)=>{
    let data = req.body;
    Etudiant.findOne({login : data.login})
    .then((etudiant)=>{
        let valid = bcrypt.compareSync(data.password,etudiant.password);
        if(!valid){
            res.send("email ou password invalid!");
        }
        else{
            let payload={
                _id : etudiant._id,
                login:etudiant.login,
                fullname: etudiant.nom,
            };
            let token = jwt.sign(payload,"123456789");
            res.send({mytoken : token});
        }
    })
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});


router.get('/all', (req,res)=>{
    Etudiant.find({})
    .then(
        (etudiant)=>{
            res.status(200).send(etudiant);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});

router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Etudiant.findOne({_id:id})
    .then(
        (etudiant)=>{
            res.status(200).send(etudiant);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});


// router.put('/update/:id',(req,res)=>{
//     let id = req.params.id;
//     let data = req.body;

//     Etudiant.findByIdAndUpdate(id, data, { new: true }) // Utilisez simplement l'ID ici
//     .then(
//         (etudiant)=>{
//             res.status(200).send(etudiant);
//         }
//     )
//     .catch(
//         (err)=>{
//             res.status(400).send(err);
//         }
//     )
// });


router.put('/update/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;

    // Assurez-vous que les données note1 et note2 sont au format numérique
    const note1 = data.note1 || 0;
    const note2 = data.note2 || 0;
    const moyenne = (note1 + note2) / 2; // Calcul de la nouvelle moyenne

    // Ajoutez la moyenne calculée aux données à mettre à jour dans la base de données
    data.moyenne = moyenne;

    Etudiant.findByIdAndUpdate(id, data, { new: true }) // Utilisez simplement l'ID ici
    .then(
        (etudiant)=>{
            res.status(200).send(etudiant);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});



router.put('/updatenote1/:id', (req, res) => {
    const id = req.params.id;
    const note1 = req.body.note1;

    Etudiant.findByIdAndUpdate(id, { note1: note1 }, { new: true })
        .then((etudiant) => {
            // Après la mise à jour de note1, mettez à jour la moyenne
            const newMoyenne = (etudiant.note2 + note1) / 2;
            return Etudiant.findByIdAndUpdate(id, { moyenne: newMoyenne }, { new: true });
        })
        .then((etudiant) => {
            res.status(200).send(etudiant);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.put('/updatenote2/:id', (req, res) => {
    const id = req.params.id;
    const note2 = req.body.note2;

    Etudiant.findByIdAndUpdate(id, { note2: note2 }, { new: true })
        .then((etudiant) => {
            // Après la mise à jour de note2, mettez à jour la moyenne
            const newMoyenne = (etudiant.note1 + note2) / 2;
            return Etudiant.findByIdAndUpdate(id, { moyenne: newMoyenne }, { new: true });
        })
        .then((etudiant) => {
            res.status(200).send(etudiant);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});


router.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;

    Etudiant.findByIdAndDelete({_id:id})
    .then(
        (etudiant)=>{
            res.status(200).send(etudiant);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});

module.exports = router;