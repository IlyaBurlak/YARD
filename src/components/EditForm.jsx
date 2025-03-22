import {useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';
import usePosts from "../hooks/usePosts";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { usePostData, postService } = usePosts();
    const { post, loading } = usePostData(id);

    useEffect(() => {
        if (post) form.setFieldsValue(post);
    }, [post, form]);

    const onFinish = async (values) => {
        await postService.savePost(id, values);
        message.success('Changes saved successfully');
        navigate(`/post/${id}`);
    };

    return (
        <Spin spinning={loading}>
            <Form
                {...layout}
                form={form}
                name="edit-form"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="body"
                    rules={[
                        { required: true, message: 'Please input the content!' },
                        { min: 10, message: 'Minimum 10 characters' }
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button htmlType="button" onClick={() => navigate(-1)} style={{ marginLeft: 0 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default EditForm;