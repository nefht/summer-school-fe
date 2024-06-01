import { useState } from 'react';
import classNames from 'classnames/bind';
import { Row, Col, Layout, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import styles from './FooterApp.module.css';
import footer from '/images/footer.svg';
import footerDecor from '/images/footer-decor.svg';
import logoName from '/images/logo-name.svg';

const cx = classNames.bind(styles);

function FooterApp() {
  const { Footer } = Layout;

  return (
    <Row>
      <Footer className={cx('footer')}>
        <img className={cx('footer-img')} src={footer} alt="Footer" />
        <img
          className={cx('footer-decor')}
          src={footerDecor}
          alt="Footer decoration"
        />
        <div className={cx('footer-content')}>
          <img className={cx('logo')} src={logoName} alt="Logo" />
          <div className={cx('content-item')}>
            <div className={cx('label')}>Địa chỉ: </div>
            <div>Phòng 301 - Nhà E3 144 - Xuân Thủy, Cầu Giấy, Hà Nội</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Tel: </div>
            <div>(024)37547064</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Thời gian làm việc: </div>
            <div>8:00 đến 20:00 giờ</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Email: </div>
            <div>fit@vnu.edu.vn.</div>
          </div>
        </div>
        <div></div>
      </Footer>
    </Row>
  );
}

export default FooterApp;
