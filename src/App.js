import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import EditForm from './components/EditForm';

const { Header, Content } = Layout;

function App() {
  return (
      <Router>
        <Layout>
          <Header style={{ color: 'white' }}>Posts App</Header>
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