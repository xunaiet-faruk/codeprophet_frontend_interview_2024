// src/components/PostForm.jsx
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const PostForm = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title,
            body,
        };
        onSubmit(postData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                    {post ? 'Update Post' : 'Create Post'}
                </Button>
                <Button onClick={onCancel} variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
                    Cancel
                </Button>
            </Box>
        </form>
    );
};

export default PostForm;
