// src/controllers/post.controller.js
import { body, validationResult } from 'express-validator';
import * as postService from '../../../services/post.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = postService.getAllPosts();
    const v2Posts = posts.map(post => ({ id: post.id, title: post.title, body: post.content }));
    res.json(v2Posts);
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
    const post = postService.getPostById(postId);
    res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // This part only runs if validation passes
    const { title, body } = req.body;
    // We can remove the manual check because the validator handles it
    // if (!title || !content) { ... }
    const newPost = postService.createPost({ title, content: body });
    res.status(201).json({ id: newPost.id, title: newPost.title, body: newPost.content });
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
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
});

export const partiallyUpdatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    // req.body will contain the fields to update, e.g., { title: "New Title" }
    const post = postService.partiallyUpdatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const success = postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
});



