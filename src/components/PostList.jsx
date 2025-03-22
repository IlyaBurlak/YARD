import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, Pagination, Card, Spin } from 'antd';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
                );
                const total = response.headers['x-total-count'];
                setTotalPages(Math.ceil(total / 10));

                const postsWithLocalData = response.data.map(post => {
                    const localData = localStorage.getItem(`post-${post.id}`);
                    return localData ? { ...post, ...JSON.parse(localData) } : post;
                });

                setPosts(postsWithLocalData);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage]);

    return (
        <Spin spinning={loading}>
            <List
                header={<h2>Posts List</h2>}
                dataSource={posts}
                renderItem={post => (
                    <List.Item>
                        <Card
                            title={post.title}
                            hoverable
                            onClick={() => navigate(`/post/${post.id}`)}
                            style={{ width: '100%' }}
                        >
                            {post.body}
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                total={totalPages * 10}
                onChange={page => setCurrentPage(page)}
                showSizeChanger={false}
                style={{ marginTop: 20, textAlign: 'center' }}
            />
        </Spin>
    );
};

export default PostList;