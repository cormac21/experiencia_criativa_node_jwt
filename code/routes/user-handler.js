const { models } = require('../model/db')
const { createToken } = require('./../jwt');
const passport = require('passport');

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuarios do sistema
 *     tags:
 *       - "users"
 *     operationId: users_list
 *     x-eov-operation-handler: user-handler
 *
 *     responses:
 *       '200':
 *          description: "Retorna a lista de usuários"
 *     security:
 *       - JWT: []
 *       - {}
 */
module.exports.users_list = [
    passport.authenticate(['jwt', 'none'], {session: false}),

  async function (req, res) {
    const id = req.user?.id;
    let users = await models.user.findAll({
      order: [['name', 'ASC']]
    });
    users = users.map(u => ({
      ...u.get(),
      self: Boolean(id === u.id)
    }));
    res.json(users);
  }
];


/**
 * @openapi
 * /users:
 *   post:
 *     summary: Insere um usuario
 *     tags:
 *       - "users"
 *     operationId: users_insert
 *     x-eov-operation-handler: user-handler
 *
 *     requestBody:
 *       description: "User data to include"
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fulano de tal"
 *
 *     responses:
 *      '201':
 *        description: "Usuário inserido"
 *      '400':
 *        description: "Parâmetro inválido"
 *
 */
module.exports.users_insert = [
  async function (req, res) {
    const { body: {name}} = req;
    const user = await models.user.create({name});
    res.status(201).json(user);
  }
];

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Lista um usuario do sistema
 *     tags:
 *       - "users"
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 *
 *     operationId: users_get
 *     x-eov-operation-handler: user-handler
 *
 *     responses:
 *       '200':
 *         description: "Retorna o usuario"
 *       '404':
 *         description: "Usuario nao encontrado"
 *
 */
module.exports.users_get = [
  async function (req, res) {
    const id = req.params.id;
    const user = await models.user.findByPk(id);
    if (!user) {
      return res.status(404).send("Quebrou a bicicleta");
    }

    return res.json({
      token: createToken(user),
      ...user.get()
    })
  }
];

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Gera um JWT do usuario autenticado
 *     tags:
 *       - "users"
 *
 *     operationId: authenticate
 *     x-eov-operation-handler: user-handler
 *
 *     requestBody:
 *       description: "A username and password combination"
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "roxtar88"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "passw0rd"
 *
 *     responses:
 *       '200':
 *         description: "Retorna o token de autenticacao"
 *       '404':
 *         description: "Usuario nao encontrado"
 *
 */
module.exports.authenticate = [
  async function (req, res) {

  }
];

