import { useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Spin } from 'antd';
import usePosts from "../hooks/usePosts";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { usePostData } = usePosts();
    const { post, loading, error } = usePostData(id);

    if (error) return <div>Error loading post details</div>;
    if (!post) return null;

    const postEntries = Object.entries(post);

    return (
        <Spin spinning={loading}>
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
                {postEntries.map(([key, value]) => (
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
        </Spin>
    );
};

export default PostDetail;