const express = require('express');
const router = express.Router()
const {checkId} = require('./plants-middleware')

const Plants = require('./plants-model.js')

//GET /api/plants/
router.get('/', (req, res)=> {
    Plants.find()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({messsage: 'Problem retrieving plants'})
        })
})
//GET /api/plants/:id
router.get('/:id', checkId, async (req, res) =>{
    res.status(200).json(req.plant)
})

//POST /api/plants/
router.post('/', (req, res) => {
    const plant = req.body
    Plants.insert(plant)
        .then((plant) => {
            res.status(201).json(plant)
        })
        .catch(500).json({messsage: 'could not add plant'})
})

//PUT /api/plants/:id
router.put('/:id', (req, res) => {
    Plants.update(req.params.id, req.body)
        .then(plant => {
            res.status(201).json({message: 'plant updated'})
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//DELETE /api/plants/:id
router.delete('/:id', (req, res) => {
    Plants.remove(req.params.id)
        .then(plant => {
            res.status(201).json(recipe);
        })
        .catch(err => {
            res.status(500).json({message: 'Problem deleting plant'})
        })
})

module.exports = router