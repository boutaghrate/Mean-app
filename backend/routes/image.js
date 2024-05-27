const express = require("express");
const router = express.Router();
const Image = require("../models/image");
const multer = require("multer");

let filename = "";

const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    filename = fl;
  },
});
const upload = multer({ storage: mystorage });//middel ware

router.post('/ajouter', upload.single('bin_img'), (req, res) => {
    let data = req.body;
    let image = new Image(data);
    image.bin_img = filename;

    image.save()
        .then((saved) => {
            res.status(200).send(saved);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.get('/all',(req,res)=>{
    Image.find()
    .then(
        (image)=>{
            res.status(200).send(image);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
});

router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;

    Image.findOne({_id:id})
    .then(
        (image)=>{
            res.status(200).send(image);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});
router.get('/getbyname/:name',(req,res)=>{
    let name = req.params.name;

    Image.findOne({nom: name})
    .then(
        (image)=>{
            res.status(200).send(image);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
});

router.get('/getImageByIdEtudiant/:id', (req, res) => {
    let id = req.params.id;

    Image.findOne({ idEtudiant: id })
        .then(
            (image) => {
                res.status(200).send(image);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
});



router.put('/update/:id', upload.single('bin_img'),(req,res)=>{
    let id = req.params.id;
    let data = req.body;

    if(filename.length > 0){
        data.bin_img = filename;
    }

    Image.findByIdAndUpdate(id, data, { new: true })
    .then(
        (image)=>{
            filename='',
            res.status(200).send(image);
        }
    )
    .catch(
    (err)=>{
        res.status(400).send(err);
    }
    )
});


router.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;

    Image.findByIdAndDelete({_id:id })
    .then(
        (image)=>{
            res.status(200).send(image);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})


module.exports = router;
