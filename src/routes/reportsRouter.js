import express from 'express';

const reportRouter = express.Router();

reportRouter.route('/company')
    .get(function (req, res) {
        res.send("get companies for: " + req.query.date)
       
    });


reportRouter.route('/')
    .get(function (req, res) {
        const { companyList} = req.query;
        const {date} = req.query;
        res.send(`get reports for:${date},${companyList.length}`)     
    });

reportRouter.route('/:companyId')
    .get(function (req, res) {
        const {companyId} = req.params,
            {date} = req.query;
            res.send(`get report for:${date},${companyId}`)     
    });

export default reportRouter;