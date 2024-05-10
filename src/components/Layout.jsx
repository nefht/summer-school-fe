import { Outlet } from 'react-router-dom';
import HeaderApp from './HeaderApp';
import { Layout as LayoutApp } from 'antd';

function Layout() {
  return (
    <LayoutApp>
      <HeaderApp />
      <Outlet />
    </LayoutApp>
  );
}

export default Layout;
