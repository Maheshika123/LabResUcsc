const mongoose = require('mongoose');
const config = require('../config/database');


const LabSchema = mongoose.Schema ({
    labname:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
});

const Lab = module.exports = mongoose.model('Lab',LabSchema);

module.exports.addLab = function(newLab,callback) {
        newLab.save(callback);    
    }   

module.exports.getLabByName = function(labname,callback) {
    const query = {labname:labname}
    Lab.findOne(query,callback);
}

module.exports.getAllLabs = function(callback){
     Lab.find({},callback);
}

module.exports.deleteLab = function(id,callback){
    const query = {_id:id}
    Lab.remove(query,callback);
}

module.exports.editLab = function(id,callback){
    const query = {_id,id}
    Lab.update(query,callback);
}


    


