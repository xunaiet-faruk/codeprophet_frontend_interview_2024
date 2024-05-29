// src/components/PostDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const PostDetailsPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching post or comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            {post && (
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {post.body}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            <Typography variant="h5" component="h3" style={{ marginTop: 32 }}>
                Comments
            </Typography>
            {comments.map((comment) => (
                <Card key={comment.id} style={{ marginTop: 16 }}>
                    <CardContent>
                        <Typography variant="h6" component="h4">
                            {comment.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {comment.body}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default PostDetailsPage;
