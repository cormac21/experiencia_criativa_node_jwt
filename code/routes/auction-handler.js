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
 *     operationId: list_all_auctions
 *     x-eov-operation-handler: auction-handler
 *
 *     responses:
 *      '200':
 *        description: "Sucesso"
 */
module.exports.list_all_auctions = [
    async function (req, res) {
        let auctions = await models.auction.findAll();
        res.json(auctions);
    }
]


/**
 * @openapi
 * /auction-items:
 *   post:
 *     summary: Adiciona um item ao leilão
 *     tags:
 *       - "auction-items"
 *     operationId: create_auction_item
 *     x-eov-operation-handler: auction-handler
 *
 *     requestBody:
 *       description: "Auction Item to include"
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             required:
 *               - auctionId
 *               - description
 *             properties:
 *               auctionId:
 *                 type: integer
 *               description:
 *                 type: string
 *
 *     responses:
 *      '200':
 *        description: "Sucesso"
 */
module.exports.create_auction_item = [
    async function (req, res) {
        const { body: {auctionId, description} } = req;
        let auction = await models.auction.findByPk(auctionId);
        if ( auction ) {
            let auctionItem = await models.auction_item.create({auctionId, description})
            res.json(auctionItem);
        } else {
            res.status(400).send();
        }
    }
]

/**
 * @openapi
 * /auction-items/{id}:
 *   delete:
 *     summary: Remove um item de um leilão
 *     tags:
 *       - "auction-items"
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 *
 *     operationId: delete_auction_item
 *     x-eov-operation-handler: auction-handler
 *
 *     responses:
 *       '200':
 *         description: "Excluido com sucesso"
 *       '404':
 *         description: "Item não encontrado"
 *
 */
module.exports.delete_auction_item = [
    async function( req, res ) {
        const itemId = req.params.id;
        const item = await models.auction_item.findByPk(itemId);
        if ( item ) {
            await item.destroy();
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    }
]

/**
 * @openapi
 * /auction-items/{id}:
 *   post:
 *     summary: Remove um item de um leilão
 *     tags:
 *       - "auction-items"
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 *
 *     operationId: update_auction_item
 *     x-eov-operation-handler: auction-handler
 *
 *     responses:
 *       '200':
 *         description: "Excluido com sucesso"
 *       '404':
 *         description: "Item não encontrado"
 *
 */
module.exports.update_auction_item = [
    async function( req, res ) {
        const itemId = req.params.id;
        const item = await models.auction_item.findByPk(itemId);
        if ( item ) {
            await models.auction_item.update({ description: description}, {where: {id: itemId}});
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    }
]

