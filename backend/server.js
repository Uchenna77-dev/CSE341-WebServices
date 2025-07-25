const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const professionalRoutes = require('./routes/professional');
const contactRoutes = require('./routes/contact');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

    
const port = 8000

app
  .use(bodyParser.json())
  .use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
  })
  .use(express.static(path.join(__dirname, '../frontend')))
  .use('/professional', professionalRoutes)
  .use('/contact', contactRoutes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use('/', require('./routes'))
  

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


