import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const PostCard = ({ post, viewPostDetails, openUpdateModal }) => (
    <Card>
        <CardContent onClick={() => viewPostDetails(post.id)}>
            <Typography variant="h5" component="div">
                {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {post.body}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => openUpdateModal(post)}>Edit</Button>
        </CardActions>
    </Card>
);

export default PostCard;
