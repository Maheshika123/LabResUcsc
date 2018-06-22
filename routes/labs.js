const express = require('express');
const router = express.Router();
const config = require('../config/database')
const Lab = require('../models/lab');

router.post('/Newlab',(req,res,next) => {   
    let newLab = new Lab({
        labname:req.body.labname,
        description:req.body.description
    }); 
    
    Lab.addLab(newLab ,(err,user) => {
            if(err) {
                res.json({success:false,msg:'Failed to register User'});
            } else {
                res.json({success:true,msg:'User Registered Succuessfully'});
            }
        });
   });

router.get('/alllabs',(req,res,next) => {
    Lab.getAllLabs((err,lablist) => {
        if(err){
            res.json({success:false,msg:'failed to load all labes'});
        } else {
            res.json({success:true,lablist:lablist});
        }
    });
})

router.delete('/:id',(req,res,next) => {    
    const id = req.params.id;
    Lab.deleteLab(id,(err,lab) => {
        if(err){
            res.json({success:false,msg:'Something went worng'})
        } else {
            res.json({success:true,msg:'lab details deleted successfully'});
        }
    });
});

router.post('/editLab/:id',(req,res,next) =>{
    const id = req.params.id;
    Lab.editLab(id,(err,lab) =>{
        if(err){
            res.json({success:false,msg:'Something went wrong'});
        } else {
            res.json({success:true,msg:'Lab details Edited Successfully'});
        }
    });
});


module.exports = router;