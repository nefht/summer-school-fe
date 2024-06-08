import './App.css';
import { Routes, Route } from 'react-router-dom';
import useMessage from './hooks/useMessage';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import CourseDetail from './pages/Course/CourseDetail';
import Posts from './pages/Posts/Posts';
import PostDetail from './pages/Posts/PostDetail';
import AboutUs from './pages/AboutUs/AboutUs';
import Confirmation from './pages/Confirmation/Confirmation';
import Cancellation from './pages/Confirmation/Cancellation';
import useScrollToTop from './hooks/useScrollToTop';

function App() {
  const { messageApi, contextHolder } = useMessage();
  useScrollToTop();

  return (
    <>
      {contextHolder}
      {/* ĐỊNH NGHĨA CÁC ROUTES */}
      <Routes>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
        <Route path="/registration-confirmation" element={<Confirmation />} />
        <Route path="/registration-cancellation" element={<Cancellation />} />

        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/course-detail" element={<CourseDetail />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post-detail/:id" element={<PostDetail />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
