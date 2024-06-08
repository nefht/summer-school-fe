import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AboutUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { getAboutUs } from '../../apis/about-us';
import RichTextDisplay from '../../utils/RichTextDisplay/RichTextDisplay';
import { useMutation } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const cx = classNames.bind(styles);

function AboutUs() {
  const [data, setData] = useState({});

  // Fetch about-us data
  const fetchData = useMutation({
    mutationFn: async () => {
      const response = await getAboutUs();
      const aboutUsData = response.data.docs[0];
      return aboutUsData;
    },
    onSuccess: (aboutUsData) => {
      setData(aboutUsData);
    },
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });

  useEffect(() => {
    fetchData.mutate();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await getAboutUs();
  //       const aboutUsData = response.data.docs[0];
  //       setData(aboutUsData);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   })();
  // }, []);

  return (
    <div className={cx('about-page')}>
      <div className={cx('intro')}>
        <h1>Giới thiệu</h1>
        {fetchData.isPending && (
          <div style={{ width: '800px' }}>
            <Skeleton active paragraph={{ rows: 20 }} />
          </div>
        )}
        <RichTextDisplay data={data.description} />
      </div>
      <div className={cx('contact-map')}>
        <div className={cx('contact')}>
          <h2>Thông tin liên hệ:</h2>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Địa chỉ:</strong>
              <address>{data.address}</address>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Số điện thoại:</strong>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Email:</strong>
              <p>{data.email}</p>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faGlobe} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Website:</strong>
              <p>{data.website}</p>
            </div>
          </div>
        </div>
        <div className={cx('separator')}></div>
        <div className={cx('map')}>
          <h2>Bản đồ:</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610911880714!2d105.78010407471467!3d21.038243387453846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1717679153747!5m2!1svi!2s"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
