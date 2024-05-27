const mongoose = require('mongoose');

const Image = mongoose.model('Image' , {
    id:{
        type:Number,
    },
    idEtudiant:{
        type:String
    },
    name:{
        type:String
    },
    type:{
        type : String
    },
    size:{
        type:Number
    },
    bin_img:{
        type:String
    }

});

module.exports = Image;
