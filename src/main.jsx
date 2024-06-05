import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const HEADER_HEIGHT = '58px';
const CONTENT_HEIGHT = `calc(100vh - 58px)`;

const theme = {
  token: {
    fontFamily: 'Raleway',
    headerHeight: HEADER_HEIGHT,
    contentHeight: CONTENT_HEIGHT,
    colorPrimary: '#0b7077',
  },
  components: {
    Input: {
      // '.ant-input': {
      //   borderRadius: '0px'
      // },
    },
    Slider: {
      railBg: '#F0F0F0',
      railHoverBg: '',
      trackBg: '#23A3EF',
      trackHoverBg: '',
    },
    Modal: {
      titleFontSize: 20,
      titleLineHeight: 2,
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme} locale={viVN}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
