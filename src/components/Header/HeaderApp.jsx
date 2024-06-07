import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Row, Col, Layout, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderApp.module.css';
import logoName from '/images/logo-name.svg';
import headerDecor from '/images/header-decor.svg';

const cx = classNames.bind(styles);

function HeaderApp() {
  const { Header } = Layout;

  const location = useLocation();

  // State kiểm tra xem có đang ở trang Home hay không
  const [home, setHome] = useState(false);
  const [course, setCourse] = useState(false);
  const [posts, setPosts] = useState(false);
  const [aboutUs, setAboutUs] = useState(false);

  // Cập nhật state khi chuyển sang trang Home
  useEffect(() => {
    setHome(location.pathname === '/');
    setCourse(location.pathname === '/course-detail');
    setPosts(location.pathname === '/posts');
    setAboutUs(location.pathname === '/about-us');
  }, [location.pathname]);

  return (
    <Row>
      <Header className={cx('header', { 'home-header': home })}>
        <img className={cx('header-decor')} src={headerDecor} alt="" />

        <Col xl={4} className={cx('col')}>
          <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
            <img className={cx('logo-img')} src={logoName} alt="Logo" />
          </Link>
        </Col>
        <Col offset={6} xl={1} xs={0}>
          <Link to="/">
            <Button
              type="text"
              className={cx('header-btn', { 'page-btn': home })}
            >
              Trang chủ
            </Button>
          </Link>
        </Col>
        <Col xl={1}>
          <Link to="/course-detail">
            <Button
              type="text"
              className={cx('header-btn', { 'page-btn': course })}
            >
              Khóa học
            </Button>
          </Link>
        </Col>
        <Col xl={1}>
          <Link to="/posts">
            <Button
              type="text"
              className={cx('header-btn', { 'page-btn': posts })}
            >
              Tin tức
            </Button>
          </Link>
        </Col>
        <Col xl={1} md={0} sm={0} xs={0}>
          <Link to="/about-us">
            <Button
              type="text"
              className={cx('header-btn', { 'page-btn': aboutUs })}
            >
              Giới thiệu
            </Button>
          </Link>
        </Col>
        <Col xl={2}>
          <Link to="http://localhost:3000/admin" target="_blank">
            <Button type="primary" className={cx('admin-btn')}>
              Trang quản trị
            </Button>
          </Link>
        </Col>
      </Header>
      <div style={{ paddingTop: '80px' }}></div>
    </Row>
  );
}

export default HeaderApp;
