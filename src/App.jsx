import './App.css';
import { Routes, Route } from 'react-router-dom';
import useMessage from './hooks/useMessage';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import CourseDetail from './pages/Course/CourseDetail';
import Posts from './pages/Posts/Posts';
import PostDetail from './pages/Posts/PostDetail';

function App() {
  const { messageApi, contextHolder } = useMessage();

  return (
    <>
      {contextHolder}
      {/* ĐỊNH NGHĨA CÁC ROUTES */}
      <Routes>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/course-detail" element={<CourseDetail />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post-detail/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
