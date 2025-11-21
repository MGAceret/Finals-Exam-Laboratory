// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { updatePost } from '../../../services/post.service.js';
import { createPostRules, updatePostRules } from '../validators/post.validator.js';


const router = Router();
/**
 * @swagger
 * tags:
 *   name: Posts (v2)
 *   description: Post endpoints for API v2
 */

/**
 * @swagger
 * /api/v2/posts:
 *   get:
 *     summary: Get all posts (v2)
 *     tags: [Posts (v2)]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /api/v2/posts:
 *   post:
 *     summary: Create a new post (v2)
 *     tags: [Posts (v2)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Validation error
 */
router.post('/', createPostRules, postController.createPost);

/**
 * @swagger
 * /api/v2/posts/{id}:
 *   get:
 *     summary: Get a single post by ID (v2)
 *     tags: [Posts (v2)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post object
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /api/v2/posts/{id}:
 *   put:
 *     summary: Update a post (v2)
 *     tags: [Posts (v2)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 */
router.put('/:id', updatePostRules, postController.updatePost);

/**
 * @swagger
 * /api/v2/posts/{id}:
 *   delete:
 *     summary: Delete a post (v2)
 *     tags: [Posts (v2)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 */
router.delete('/:id', postController.deletePost);

export default router;