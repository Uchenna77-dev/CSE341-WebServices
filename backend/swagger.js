const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'API documentation for Contact routes',
  },
  host: 'localhost:8000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contact.js']; // update with your actual routes path

swaggerAutogen(outputFile, endpointsFiles, doc);
