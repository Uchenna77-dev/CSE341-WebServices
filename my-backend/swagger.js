const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'API documentation for Vehicle routes',
  },
  host: 'localhost:7000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/cars.js', './routes/motoBikes.js']; // update with your actual routes path

swaggerAutogen(outputFile, endpointsFiles, doc);
