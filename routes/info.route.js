const InfoModel = require('../models/info.model');
const InfoRoutes = require('express').Router();

InfoRoutes.get('/', async (req, res) => {
    try {
        let data = await InfoModel.ShowAllInfo();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
InfoRoutes.put('/', async (req, res) => {
    try {
        let data = await InfoModel.AddlInfo();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
InfoRoutes.put('/:id/:description', async (req, res) => {
    try {
        let {id} = req.params;
        let { description } = req.body;
        let data = await InfoModel.UpdateInfo(id,description);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = InfoRoutes;