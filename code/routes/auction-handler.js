const { models } = require('../model/db')
const passport = require("passport");

/**
 * @openapi
 * /auctions:
 *   post:
 *     summary: Insere um leilão
 *     tags:
 *       - "auctions"
 *     operationId: auctions_insert
 *     x-eov-operation-handler: auction-handler
 *
 *     requestBody:
 *       description: "Auction to include"
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - startTime
 *               - endTime
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *      '201':
 *        description: "Leilão inserido"
 *      '400':
 *        description: "Parâmetros inválidos"
 *     security:
 *      - JWT: []
 */
module.exports.auctions_insert = [
    passport.authenticate(['jwt', 'none'], {session: false}),

    async function (req, res) {
        const userId = req.user?.id;
        const { body: {startTime, endTime}} = req;
        const auction = await models.auction.create({
            startTime: startTime,
            endTime: endTime,
            status: 'pending',
            createdByUser: userId});
        res.status(201).json(auction);
    }
];

/**
 * @openapi
 * /auctions/open:
 *   get:
 *     summary: Lista todos os leilões abertos (em andamento)
 *     tags:
 *       - "auctions"
 *     operationId: list_open_auctions
 *     x-eov-operation-handler: auction-handler
 *
 *     responses:
 *      '200':
 *        description: "Sucesso"
 *
 */
module.exports.list_open_auctions = [
    async function (req, res) {
        let auctions = await models.auction.findAll({
            where: {
                status: 'active'
            }
        })
        res.json(auctions);
    }
]

/**
 * @openapi
 * /auctions:
 *   get:
 *     summary: Lista todos os leilões
 *     tags:
 *       - "auctions"
 *     operationId: list_open_auctions
 *     x-eov-operation-handler: auction-handler
 *
 *     responses:
 *      '200':
 *        description: "Sucesso"
 */
module.exports.list_open_auctions = [
    async function (req, res) {
        let auctions = await models.auction.findAll();
        res.json(auctions);
    }
]



