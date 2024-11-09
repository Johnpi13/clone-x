const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Clone-X API',
      version: '1.0.0',
      description: 'API documentation for Clone-X',
      contact: {
        name: 'Jhon Alejandro',
        email: 'your-email@example.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Tweet: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID del tweet',
              example: '60c72b2f4f1a2c001f5d8f8e'
            },
            userName: {
              type: 'string',
              description: 'Nombre del usuario que publicó el tweet',
              example: 'user123'
            },
            body: {
              type: 'string',
              description: 'Contenido del tweet',
              example: 'Este es un tweet de ejemplo'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del tweet',
              example: '2023-05-12T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de actualización del tweet',
              example: '2023-05-12T15:00:00.000Z'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js', './services/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
