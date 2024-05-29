// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Modal,
    TextField,
    Container,
    Grid,
    Fab,
    Box
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import PostForm from './CreatePostPage';
import UpdatePostPage from './UpdatePostPage';
import  './HomePage.css'
const useStyles = makeStyles(() => ({
    fab: { position: 'fixed', bottom: 16, right: 16 },
    modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    paper: { backgroundColor: '#fff', border: '2px solid #000', boxShadow: 24, padding: 16 },
    navLink: { textDecoration: 'none', color: 'inherit', marginRight: 16 },
    content: { marginTop: 16 },
    toolbar: { display: 'flex', justifyContent: 'space-between' },
    section: { marginTop: 32 },
}));


const HomePage = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
                setTrendingPosts(getRandomPosts(response.data, 5));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrendingPosts(getRandomPosts(posts, 5));
        }, 30000);

        return () => clearInterval(interval);
    }, [posts]);

    const getRandomPosts = (posts, count) => {
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleCreatePost = async (post) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
            const newPost = { ...response.data, id: Math.floor(Math.random() * 1000) }; // Generate a random ID
            setPosts([newPost, ...posts]);
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setCreateModalOpen(false);
        }
    };

   

    const openUpdateModal = (post) => {
        setCurrentPost(post);
        setUpdateModalOpen(true);
    };


    const viewPostDetails = (id) => {
        navigate(`/posts/${id}`);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Box>
                        <img className="icons" src="https://i.ibb.co/M8krpZM/image.png" alt="" />
                    </Box>
                    <Box>
                        <Typography variant="h6" component={Link} to="/" className={classes.navLink}>
                            Emotion Sharing App
                        </Typography>
                    </Box>
                    <Fab color="info" aria-label="add" onClick={() => setCreateModalOpen(true)}>
                        <AddIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h4" gutterBottom align='center '>Trending Posts</Typography>
                <Grid container spacing={3}>
                    {trendingPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
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
                        </Grid>
                    ))}
                </Grid>

                <Typography align='center' variant="h4" gutterBottom className={classes.allPostsTitle}>All Posts</Typography>
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
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
                        </Grid>
                    ))}
                </Grid>
            </Container>

            
            <Modal
                open={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                className={classes.modal}
            >
                <div className={classes.paper}>
                    <PostForm onSubmit={handleCreatePost} onCancel={() => setCreateModalOpen(false)} />
                </div>
            </Modal>

            <UpdatePostPage classes={classes} posts={posts} isUpdateModalOpen={isUpdateModalOpen} setUpdateModalOpen={setUpdateModalOpen} currentPost={currentPost} setCurrentPost={setCurrentPost} setPosts={setPosts}/>
        </div>
    );
};

export default HomePage;
