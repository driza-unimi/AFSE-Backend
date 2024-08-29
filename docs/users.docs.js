/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to user actions
 */

/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Retrieve the authenticated user's details
 *     description: Returns the details of the user based on the authentication token provided in the request. Requires authentication.
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer token for authentication
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved the user details
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     credit:
 *                       type: number
 *                     cards:
 *                       type: object
 *                       description: List of hero cards owned by the user
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
 * /api/v1/user/:
 *   put:
 *     summary: Update the authenticated user's email or password
 *     description: Updates the authenticated user's email or password. Admin users cannot be edited. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: The new email address of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Successfully updated user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     credit:
 *                       type: number
 *                     cards:
 *                       type: object
 *                       description: List of hero cards owned by the user
 *       400:
 *         description: Bad request. Admin users cannot be edited.
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
 *                   example: "Cannot edit admin user"
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
 * /api/v1/user/:
 *   delete:
 *     summary: Delete the authenticated user's account
 *     description: Deletes the authenticated user's account and clears the authentication token. Admin users cannot be deleted. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully deleted user account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request. Admin users cannot be deleted.
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
 *                   example: "Cannot delete admin user"
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
 * /api/v1/user/offers:
 *   get:
 *     summary: Get valid offers
 *     description: Retrieves a list of all valid offers. Requires authentication.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of valid offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: object
 *                     properties:
 *                      id:
 *                        type: string
 *                        description: The offer ID.
 *                      name:
 *                        type: string
 *                        description: The name of the offer.
 *                      value:
 *                        type: number
 *                        description: The value associated with the offer (e.g., credits or number of items).
 *                      valid:
 *                        type: boolean
 *                        description: The validity status of the offer.
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
 * /api/v1/user/buy:
 *   post:
 *     summary: Purchase an offer
 *     description: Allows a user to purchase an offer. The offer can be credits or a pack of cards. Requires authentication.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1aa8d981-8db5-4da9-8303-00585310b3cc
 *                 description: The ID of the offer to purchase.
 *     responses:
 *       200:
 *         description: Offer successfully purchased.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The hero ID.
 *                   name:
 *                     type: string
 *                     description: The name of the hero.
 *                   rarity:
 *                     type: string
 *                     description: The rarity of the hero (e.g., common, legendary).
 *                   count:
 *                     type: number
 *                     description: The number of this hero the user owns.
 *       400:
 *         description: Bad request. Offer not found, invalid, or insufficient credits.
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
