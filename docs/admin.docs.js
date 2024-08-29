/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Operations requiring admin privileges
 */

/**
 * @swagger
 * /api/v1/admin/update/offer:
 *   post:
 *     summary: Update an offer's validity
 *     description: Updates the validity status of an offer. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - valid
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1aa8d981-8db5-4da9-8303-00585310b3cc
 *                 description: The ID of the offer to update.
 *               valid:
 *                 type: boolean
 *                 description: The new validity status of the offer.
 *     responses:
 *       200:
 *         description: Offer successfully updated.
 *       400:
 *         description: Bad request. Offer not found or validation failed.
 *       401:
 *         description: Unauthorized. User is not authenticated or is not an admin.
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
 * /api/v1/admin/allOffers:
 *   get:
 *     summary: Get all offers
 *     description: Retrieves a list of all offers. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of all offers (valid or not).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The offer ID.
 *                   name:
 *                     type: string
 *                     description: The offer name.
 *                   cost:
 *                     type: number
 *                     description: The cost of the offer.
 *                   type:
 *                     type: string
 *                     description: The offer type (credit or pack).
 *                   valid:
 *                     type: string
 *                     description: The validity status of the offer.
 *                   value:
 *                     type: string
 *                     description: The value of the offer.
 *                   description:
 *                     type: string
 *                     description: The description of the offer.
 *                   __v:
 *                     type: number
 *       401:
 *         description: Unauthorized. User is not authenticated or is not an admin.
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
