import express from 'express'
import cors from 'cors'
import reportsRouter from './routes/reportsRouter'
import bodyParser from 'body-parser';
import path from 'path'
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, 'pages')))

app.use('/reports', reportsRouter);

app.get('/', (req, res) => res.send('Hello World!'))

// error handler
app.use(function (err, req, res, next) {
   console.error(err.stack)
    res.status(500).send(err.message)
})

app.listen(3000, () => console.log('app listening on port 3000!'))