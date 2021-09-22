const router = require('express').Router();
const Users = require('./users-model');
const {restricted, checkIdUsers} = require('../auth/auth-middleware');

//GET /api/users/
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            // we need to whitelist this in the future
            const clean_users = users.map(user => { 

              return {
                    user_id: user.user_id,
                    username: user.username,
                    phone_number: user.phone_number,
                    
                    
                    
                }  
            
            })
            res.status(200).json(clean_users);
        })
        .catch(err => {
            res.status(500).json({message: 'Problem getting users'})
        });
})

//GET /api/users/:id
router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)

    if (user) {
      res.status(200).json({message: `User found: ${user.username}`, user})

    } else {

      res.status(404).json({message: `User not found`})
    }
    
})

//GET /api/users/:id/plants
router.get('/:id/plants', (req,res) => {
    Users.findUsersPlants(req.params.id)
        .then(plant => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(500).json({message: 'Problem retreiving plant'})
        })
})

//POST /api/users
router.post('/', (req, res) => {
    Users.add(req.body)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({message: 'Problem creating users'})
        })
})

//POST /api/users/:id/plants
router.post('/:id/plants', (req, res) => {
    Users.findUsersPlants(req.params.id)
        .then(plant => {
            if(plant) {
                Users.insertPlant(req.body, req.params.id)
                    .then(newPlant => {
                        res.status(201).json(newPlant)
                    })
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Problem creating plant'})
        })
})

//PUT /api/user/:id
router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
        .then(users => {
            res.status(201).json(users);
        }) 
        .catch(err => {
            res.status(500).json({message: 'Problem updating users'})
        })
})

//PUT /api/users/:id/plants/:id
router.put('/:id/plants/:id', (req, res) => {
    Users.findUsersPlants(req.params.id)
        .then(plant => {
            if(plant) {
                Users.updateUsersPlant(req.params.id, req.body)
                    .then(newPlant => {
                        res.status(201).json(newPlant);
                    });
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Problem updating users plants'})
        })
})

//DELETE /api/users/:id
router.delete('/:id', checkIdUsers, async (req, res, next) => {
    try {
        const deletedUser = await Users.remove(req.params.id)
        res.status(200).json({message:'user has been deleted'})
    } catch (err) {
        next(err)
    }
})

//DELTE /api/users/:id/plants/:id
router.delete('/:id/plants/:id', (req, res) => {
    Users.findUsersPlants(req.params.id)
        .then(recipe => {
            if(recipe) {
                Users.removeUserPlant(req.params.id)
                    .then(newPlant => {
                        res.status(201).json(newPlant)
                    })
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Problem removing users plants'})
        })
})

module.exports = router;

