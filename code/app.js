var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//OpenAPI configuration
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const passport = require('passport');
const jwt = require('./jwt')

const app = express();
const database = require('../models')

app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

passport.use('jwt', jwt.strategy.jwt);
passport.use('none', jwt.strategy.none);

const swaggerOptions = {
  swaggerDefinition: {
      openapi: "3.0.3",
      info: {
          title: "server legal",
          version: "1.0.0",
          description: "server legal documentation"
      },
      servers: [{
        url: "http://localhost:3000/api",
        description: "server legal"
      }]
  },
  apis: [
      __dirname + "/routes/**/*.yaml",
      __dirname + "/routes/**/*.js"
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
delete swaggerDocs.channels;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(OpenApiValidator.middleware({
    apiSpec: swaggerDocs,
    unknownFormats: [],
    operationHandlers: __dirname + "/routes"
}));

module.exports = app;
