import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Spin } from 'antd';
import axios from 'axios';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const apiResponse = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );

                const localData = localStorage.getItem(`post-${id}`);
                const mergedData = {
                    ...apiResponse.data,
                    ...(localData ? JSON.parse(localData) : {})
                };

                const dataEntries = Object.entries(mergedData);

                setPost(dataEntries);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    return (
        <Spin spinning={loading}>
            {post && (
                <Descriptions
                    title="Post Details"
                    bordered
                    column={1}
                    extra={[
                        <Button key="edit" type="primary" onClick={() => navigate(`/edit/${id}`)}>
                            Edit
                        </Button>,
                        <Button key="back" onClick={() => navigate('/')}>
                            Back to List
                        </Button>
                    ]}
                >
                    {post.map(([key, value]) => (
                        <Descriptions.Item
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                        >
                            {typeof value === 'object'
                                ? JSON.stringify(value)
                                : value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Spin>
    );
};

export default PostDetail;