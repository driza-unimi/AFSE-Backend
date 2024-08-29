/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication operations
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 */

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: User signup
 *     description: Registers a new user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               email:
 *                 type: string
 *                 description: The email of the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Username or email already in use.
 */

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the authenticated user.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully logged out.
 */
