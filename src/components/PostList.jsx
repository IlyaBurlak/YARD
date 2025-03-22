import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Pagination, Card, Spin } from 'antd';
import usePosts from "../hooks/usePosts";

const PostList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { usePaginatedPosts } = usePosts();
    const { posts, total, loading, error } = usePaginatedPosts(currentPage);
    const navigate = useNavigate();

    if (error) return <div>Error loading posts</div>;

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
                total={total}
                onChange={setCurrentPage}
                showSizeChanger={false}
                pageSize={10}
            />
        </Spin>
    );
};

export default PostList;