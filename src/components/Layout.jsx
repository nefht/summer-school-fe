import { Outlet } from 'react-router-dom';
import { Layout as LayoutApp } from 'antd';
import HeaderApp from './Header/HeaderApp';
import FooterApp from './Footer/FooterApp';

function Layout() {
  return (
    <LayoutApp>
      <HeaderApp />
      <Outlet />
      <FooterApp />
    </LayoutApp>
  );
}

export default Layout;
