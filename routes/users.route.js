const UserModel = require('../models/user.model');
const UsersRoutes = require('express').Router();


UsersRoutes.get('/:email/:password', async (req, res) => {
    try {
        let { email,password } = req.params;
        let data = await UserModel.FindOneUser(email,password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.put('/:email/:password', async (req, res) => {
    try {
        let { email,password } = req.params;
        let data = await UserModel.UpdateUser(email,password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.put('/', async (req, res) => {
    try {
        let { user } = req.body;
        let data = await UserModel.InsertUser(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
//Add ObjectId
UsersRoutes.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await UserModel.RemovetUser(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});



module.exports = UsersRoutes;