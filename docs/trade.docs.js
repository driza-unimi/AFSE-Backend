/**
 * @swagger
 * tags:
 *   - name: Trade
 *     description: Operations related to user actions
 */

/**
 * @swagger
 * /api/v1/trade/:
 *   get:
 *     summary: Get random trade offers
 *     description: Retrieves a random selection of 20 trade offers from the database.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     responses:
 *       200:
 *         description: A list of random trade offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Random offers"
 *                 data:
 *                   type: array
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /api/v1/trade/:
 *   put:
 *     summary: Create a trade offer
 *     description: Creates a new trade offer for a card. Requires the user to have at least two duplicates of the card.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: string
 *                 description: The ID of the card to trade.
 *     responses:
 *       200:
 *         description: Trade created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Trade created successfully"
 *                 data:
 *                   type: array
 *       400:
 *         description: Bad request. Card not available for offer or insufficient duplicates.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /api/v1/trade/sellAll:
 *   post:
 *     summary: Sell a card for credits
 *     description: Sells a duplicate card for credits. Requires the user to have more than one duplicate of the card.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: string
 *                 description: The ID of the card to sell.
 *     responses:
 *       200:
 *         description: Card sold successfully, and the user received credits.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Card sold successfully"
 *                 newCredit:
 *                   type: number
 *                   description: The new credit balance after selling the card.
 *       400:
 *         description: Bad request. Card not available for sale or insufficient duplicates.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /api/v1/trade/{id}:
 *   delete:
 *     summary: Delete a trade offer
 *     description: Deletes a trade offer if it belongs to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the trade offer to delete.
 *     responses:
 *       200:
 *         description: Trade deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request. Trade not found or unauthorized.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */

/**
 * @swagger
 * /api/v1/trade/offer:
 *   post:
 *     summary: Make an offer on a trade
 *     description: Allows a user to make an offer by offering their own cards for a trade.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerId:
 *                 type: string
 *                 description: The ID of the trade offer.
 *                 example: "64c7a9e84f632e001a287e0d"
 *               offeredCardIds:
 *                 type: array
 *                 description: The IDs of the cards being offered by the user.
 *                 items:
 *                   type: string
 *                 example: ["64c7a9e84f632e001a287e0a", "64c7a9e84f632e001a287e0b"]
 *     responses:
 *       200:
 *         description: Offer made successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Offer made successfully"
 *       400:
 *         description: Bad request due to invalid trade or card selection.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid cards in offer"
 */

/**
 * @swagger
 * /api/v1/trade/accept:
 *   post:
 *     summary: Accept a trade offer
 *     description: Allows a user (seller) to accept a specific offer from a list of trade offers.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerId:
 *                 type: string
 *                 description: The ID of the trade offer.
 *                 example: "64c7a9e84f632e001a287e0d"
 *               selectedOfferId:
 *                 type: string
 *                 description: The ID of the specific offer being accepted.
 *                 example: "64c7a9e84f632e001a287e0e"
 *     responses:
 *       200:
 *         description: Offer accepted, trade completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Offer accepted, trade completed"
 *       400:
 *         description: Bad request due to invalid trade or card selection.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Selected offer not found"
 */
