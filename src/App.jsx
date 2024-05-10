import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useMessage from './hooks/useMessage';
import { getRegistrations } from './apis/registrations';

function App() {
  const { messageApi, contextHolder } = useMessage();

  // Mẫu gọi GET API
  useEffect(() => {
    (async () => {
      try {
        const response = await getRegistrations();
        console.log('Registrations fetched:', response);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    })();
  }, []);

  return (
    <>
      {contextHolder}
      <div>hello</div>
      {/* 
      ĐỊNH NGHĨA CÁC ROUTES
      
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/course-detail" element={<CourseDetail />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post-detail/:id" element={<PostDetail />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
