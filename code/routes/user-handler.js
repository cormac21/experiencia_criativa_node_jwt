const User = require('../model/User');

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
 */
module.exports.users_list = [
  async function (req, res) {
    let users = await User.findAll({
      order: [['name', 'ASC']]
    });
    users = users.map(u => u.get());
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
    const user = await User.create({name});
    res.status(201).json(user);
  }
];
