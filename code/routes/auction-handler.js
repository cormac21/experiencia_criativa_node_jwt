const { models } = require('../model/db')

function convertTime(startTime) {
    return startTime.replace('T', ' ').substring(0, startTime.length - 1);
}

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
 *
 */
module.exports.auctions_insert = [
    async function (req, res) {
        const { body: {startTime, endTime}} = req;
        const auction = models.auction.create({ startTime, endTime});
        res.status(201).json(auction);
    }
];