import { useState, useEffect } from 'react';
import PostService from '../services/PostService';
import axios from 'axios';

const usePosts = () => {
    const apiClient = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });
    const postService = new PostService(apiClient, localStorage);

    const usePostData = (id) => {
        const [post, setPost] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
            const load = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await postService.getPost(id);
                    setPost(data);
                } catch (err) {
                    setError(err);
                    console.error('Failed to fetch post:', err);
                } finally {
                    setLoading(false);
                }
            };
            load();
        }, [id]);

        return { post, loading, error };
    };

    const usePaginatedPosts = (page) => {
        const [data, setData] = useState({ posts: [], total: 0 });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
            const load = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await postService.getPaginatedPosts(page);
                    setData(result);
                } catch (err) {
                    setError(err);
                    console.error('Failed to fetch posts:', err);
                } finally {
                    setLoading(false);
                }
            };
            load();
        }, [page]);

        return { ...data, loading, error };
    };

    return { usePostData, usePaginatedPosts, postService };
};

export default usePosts;