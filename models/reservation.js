const mongoose = require('mongoose');
const config = require('../config/database');


const ReservationSchema = mongoose.Schema ({

    username:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    labname:{
        type:String,
        required:true
    },
    reserveddate:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
});

const Reservation = module.exports = mongoose.model('Reservation',ReservationSchema);

module.exports.addReservation = function(newReservation,callback) {
        newReservation.save(callback);    
    }   

/*module.exports.getReser = function(labname,callback) {
    const query = {labname:labname}
    Lab.findOne(query,callback);
} */

module.exports.getAllReservations = function(callback){
     Reservation.find({},callback);
}

module.exports.getMyReservations = function(username,callback){
    const query = {username:username};
    Reservation.find(query,callback);

}
module.exports.deleteReservation = function(id,callback){
    const query = {_id:id}
    Reservation.remove(query,callback);
}

module.exports.editReservation = function(id,eReservation,callback) {
    const query = {_id:id}
    eReservation.update(query);
}

module.exports.getOneReservation = function(id,callback){
    const query = {_id:id}
    Reservation.findOne(query,callback);
}





// module.exports.deleteLab = function(id,callback){
//     const query = {_id:id}
//     Lab.remove(query,callback);
// }

// module.exports.editLab = function(id,callback){
//     const query = {_id,id}
//     Lab.update(query,callback);
// }





