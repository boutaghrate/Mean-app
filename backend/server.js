const express = require('express');
const cors = require('cors'); // Import du module CORS(Cross-Origin Resource Sharing)
// vous pouvez configurer votre serveur pour permettre ou restreindre les requêtes provenant d'autres domaines.
require('./config/connect');
const etudiant = require('./routes/etudiant');
const image = require('./routes/image');
const formulaire = require('./routes/formulaire')
const app = express();

app.use(express.json());
app.use(cors()); // Utilisation du module CORS pour permettre les requêtes entre différentes sources
app.use('/etudiant', etudiant);
app.use('/image', image);
app.use('/formulaire',formulaire);
app.use('/getimage', express.static('./uploads'));

app.listen(3000, () => {
    console.log('server work');
});
