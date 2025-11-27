const express = require('express')
const router = express.Router()

const ProjectsController = require('../controllers/projects')

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT Authorization header using the Bearer scheme. Enter your JWT token in the text input below.
 *   security:
 *     - bearerAuth: []
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "673e79f496a4c93480a234c1"
 *         name:
 *           type: string
 *           example: "My Project"
 *         description:
 *           type: string
 *           example: "Project for studies"
 *         url:
 *           type: string
 *           example: "https://myproject.com"
 *         image:
 *           type: string
 *           example: "https://cdn.myproject.com/banner.png"
 *         ownerId:
 *           type: string
 *           example: "USER123"
 *       required:
 *         - name
 *         - description
 *         - url
 *         - image
 *         - ownerId
 *
 *     ProjectCreateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         url:
 *           type: string
 *         image:
 *           type: string
 *       required:
 *         - name
 *         - description
 *         - url
 *         - image
 *
 *     ProjectUpdateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         url:
 *           type: string
 *         image:
 *           type: string
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Returns all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filters projects by partial name match (case-insensitive)
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       503:
 *         description: Database connection error
 *       500:
 *         description: Internal server error while fetching projects

 */
router.get('/api/projects', ProjectsController.get)

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Creates a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreateRequest'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 url:
 *                   type: string
 *                 image:
 *                   type: string
 *       400:
 *         description: Validation error — missing required fields
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       503:
 *         description: Database connection error
 *       500:
 *         description: Internal server error while creating project
 */
router.post('/api/projects', ProjectsController.post)

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Updates a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateRequest'
 *     responses:
 *       201:
 *         description: Project updated successfully
 *       400:
 *         description: No fields provided to update
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       503:
 *         description: Database connection error
 *       500:
 *         description: Internal server error while updating project
 */
router.put('/api/projects/:id', ProjectsController.put)

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Deletes a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project to delete
 *     responses:
 *       204:
 *         description: Project removed successfully (no content)
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       503:
 *         description: Database connection error
 *       500:
 *         description: Internal server error while deleting project
 */
router.delete('/api/projects/:id', ProjectsController.remove)

module.exports = router
