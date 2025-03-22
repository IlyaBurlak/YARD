import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';
import axios from 'axios';

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );
                const localData = localStorage.getItem(`post-${id}`);
                form.setFieldsValue({
                    title: localData ? JSON.parse(localData).title : response.data.title,
                    body: localData ? JSON.parse(localData).body : response.data.body,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, form]);

    const onFinish = (values) => {
        localStorage.setItem(`post-${id}`, JSON.stringify(values));
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
                    <Button htmlType="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default EditForm;