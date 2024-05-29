import React from 'react';
import PostForm from './CreatePostPage';
import axios from 'axios';
import { Modal } from '@mui/material';

const UpdatePostPage = ({ classes , setUpdateModalOpen, isUpdateModalOpen, currentPost, setCurrentPost, setPosts, posts }) => {

    const handleUpdatePost = async (updatedPost) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/posts/${currentPost.id}`, updatedPost);
            setPosts(posts.map(post => (post.id === currentPost.id ? updatedPost : post)));
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setUpdateModalOpen(false);
            setCurrentPost(null);
        }
    };
    return (
        <div>
            {currentPost && (
                <Modal
                    open={isUpdateModalOpen}
                    onClose={() => setUpdateModalOpen(false)}
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <PostForm
                            post={currentPost}
                            onSubmit={handleUpdatePost}
                            onCancel={() => setUpdateModalOpen(false)}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UpdatePostPage;