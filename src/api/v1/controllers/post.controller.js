// src/api/v1/controllers/post.controller.js
import { validationResult } from 'express-validator';
import * as postService from '../../../services/post.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json(posts);
});

/*
export const getPostById = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};
*/

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);
    res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // This part only runs if validation passes
    const { title, content, authorId } = req.body;
    // We can remove the manual check because the validator handles it
    // if (!title || !content) { ... }
    const newPost = await postService.createPost({ title, content }, authorId );
    res.status(201).json(newPost);
});

/*
export const updatePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};
*/

// src/controllers/post.controller.js

export const updatePost = asyncHandler(async (req, res) => {
    // Check for validation errors first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If data is valid, proceed with update logic
    const postId = parseInt(req.params.id, 10);
    const post = await postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
});

export const partiallyUpdatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    // req.body will contain the fields to update, e.g., { title: "New Title" }
    const post = await postService.partiallyUpdatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const success = await postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
});



