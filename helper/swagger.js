const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exam System API',
      version: '1.0.0',
      description: 'API documentation for Exam system',
    },
    servers: [
      {
        url: process.env.BACKEND_BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/v1/*.js'], 
};

module.exports = swaggerJsDoc(options);
