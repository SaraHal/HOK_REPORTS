import express from 'express'
import cors from 'cors'
import reportsRouter from './routes/reportsRouter'
//import bodyParser from 'body-parser';

const app = express()

app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/reports', reportsRouter);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('app listening on port 3000!'))