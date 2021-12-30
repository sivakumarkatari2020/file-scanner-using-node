const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./middleware/logger');
const saveFileDataRoute = require('./routes/saveFileDataRoute');
const getFileDataRoute = require('./routes/getFileDataRoute');
const { main } = require('./scanner');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/welcome', (req, res) => { 
    res.send('Welcome to LST file scanner');
    main();
});

app.use('/api',saveFileDataRoute.routes);
app.use('/api',getFileDataRoute.routes);

app.listen(config.port, ()=>{
    console.log(`Example app listening at http://localhost:${config.port}`);
});