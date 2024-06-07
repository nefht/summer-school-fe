import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Row, Col, Layout, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import styles from './FooterApp.module.css';
import footer from '/images/footer.svg';
import footerDecor from '/images/footer-decor.svg';
import logoName from '/images/logo-name.svg';
import { getAboutUs } from '../../apis/about-us';

const cx = classNames.bind(styles);

function FooterApp() {
  const { Footer } = Layout;

  const [data, setData] = useState({});

  // Fetch about-us data
  useEffect(() => {
    (async () => {
      try {
        const response = await getAboutUs();
        const aboutUsData = response.data.docs[0];
        setData(aboutUsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    })();
  }, []);

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
            <div>{data.address}</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Tel: </div>
            <div>{data.phone}</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Thời gian làm việc: </div>
            <div>{data.workingTime}</div>
          </div>
          <div className={cx('content-item')}>
            <div className={cx('label')}>Email: </div>
            <div>{data.email}</div>
          </div>
        </div>
        <div className={cx('school')}>
          <span className={cx('item')}>
            Được tổ chức bởi <b>Trường Đại học Công nghệ</b>
          </span>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUET.VNUH&tabs&width=340&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
            className={cx('facebook-address')}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </Footer>
    </Row>
  );
}

export default FooterApp;
