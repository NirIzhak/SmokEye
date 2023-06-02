const ReportModel = require('../models/report.model');
const ReportsRoutes = require('express').Router();

ReportsRoutes.get('/', async (req, res) => {
    try {
        let data = await ReportModel.ShowAllReports();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
ReportsRoutes.get('/:city', async (req, res) => {
    try {
        let { city } = req.params;
        let data = await ReportModel.ShowReportByCity(city);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
ReportsRoutes.get('/', async (req, res) => {
    try {
        let { report } = req.body;
        let data = await ReportModel.ShowUserReports(report);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
ReportsRoutes.put('/', async (req, res) => {
    try {
        let { report } = req.body;
        let data = await ReportModel.InsertNewReport(report);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = ReportsRoutes;