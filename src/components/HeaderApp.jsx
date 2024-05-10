import { useState } from 'react';
import { Layout, Button, Avatar, Typography, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function HeaderApp() {
  // user - nghĩa là kí tự đầu tiên trong tên của người dùng đăng nhập, cái mà mình hiển thị trên Avatar
  const [user, setUser] = useState('M');

  const { Header } = Layout;
  const { Text } = Typography;

  // Lấy Property từ Theme ra dùng để đồng bộ và dễ sửa đổi cho sau này.
  const {
    token: { headerHeight },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          height: headerHeight,
          width: '100%',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderBottomColor: '#CCE5F4',
          boxShadow: '0px 0px 4px #00000040',
          position: 'fixed',
          zIndex: '999',
        }}
      >
        <Text
          style={{
            color: '#0D77B5',
            fontFamily: 'Open-Dyslexic',
            fontWeight: 'bold',
            fontSize: '1.8rem',
          }}
        >
          Readable
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            type="text"
            style={{ color: '#23A3EF', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Home
          </Button>
          <Button
            type="text"
            style={{ color: '#23A3EF', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Blogs
          </Button>
          <Link to="/blog-list/upload">
            <Button
              size="middle"
              icon={<PlusOutlined />}
              style={{
                color: '#23A3EF',
                borderColor: '#23A3EF',
                cursor: 'pointer',
                marginRight: '16px',
              }}
            >
              Upload
            </Button>
          </Link>
          <Avatar style={{ backgroundColor: '#0D77B5', cursor: 'pointer' }}>
            {user}
          </Avatar>
        </div>
      </Header>
      <div style={{ paddingTop: headerHeight }}></div>
    </>
  );
}

export default HeaderApp;
