const router = require('express').Router();
const Plants = require('./plants-model')

async function checkId(req,res,next) {
    try{ 
        const plant = await Plants.findById(req.params.id)
        if(plant){
            req.plant = plant
            next()
        }else {
            res.status(404).json("plant not found")
        }
    } catch {
        next(err)
    }
}

module.exports={
    checkId
}