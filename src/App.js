import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import EditForm from './components/EditForm';
import './App.css';

const { Header, Content } = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <Header className="app-header">
                    <div className="header-content">
                        <div className="logo-title-wrapper">
                            <img
                                src={`${process.env.PUBLIC_URL}/Logo.png`}
                                alt="Altair Logo"
                                className="brand-logo"
                            />
                            <div>
                                <span className="app-title">POSTS</span>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content style={{ padding: '24px 50px' }}>
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/edit/:id" element={<EditForm />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;