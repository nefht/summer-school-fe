import classNames from 'classnames/bind';
import styles from './AboutUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import aboutus from '/images/aboutus.jpg';

const cx = classNames.bind(styles);

function AboutUs() {
  return (
    <div className={cx('about-page')}>
      <div className={cx('intro')}>
        <h1>Giới thiệu</h1>
        <p>
          Được thành lập vào năm 1995 nhưng Khoa CNTT có truyền thống hơn 50 năm
          phát triển từ năm 1965 với việc đào tạo chuyên ngành Máy tính tại Khoa
          Toán Cơ thuộc Trường Đại học Tổng hợp Hà Nội. Với sự nỗ lực cố gắng
          của tập thể các cán bộ giảng viên, các thế hệ sinh viên, học viên và
          nghiên cứu sinh; dưới sự chỉ đạo sát sao, ủng hộ và tạo điều kiện của
          các thế hệ lãnh đạo Trường ĐHCN và ĐHQGHN, Khoa CNTT ngày hôm nay đã
          đạt được nhiều thành tích nổi bật trong hoạt động đào tạo, bồi dưỡng
          nhân tài và nghiên cứu khoa học tiếp cận trình độ tiên tiến trong khu
          vực và thế giới.
        </p>
        <img src={aboutus} alt="AboutUs Image"></img>
        <p>
          Được thành lập vào năm 1995 nhưng Khoa CNTT có truyền thống hơn 50 năm
          phát triển từ năm 1965 với việc đào tạo chuyên ngành Máy tính tại Khoa
          Toán Cơ thuộc Trường Đại học Tổng hợp Hà Nội. Với sự nỗ lực cố gắng
          của tập thể các cán bộ giảng viên, các thế hệ sinh viên, học viên và
          nghiên cứu sinh; dưới sự chỉ đạo sát sao, ủng hộ và tạo điều kiện của
          các thế hệ lãnh đạo Trường ĐHCN và ĐHQGHN, Khoa CNTT ngày hôm nay đã
          đạt được nhiều thành tích nổi bật trong hoạt động đào tạo, bồi dưỡng
          nhân tài và nghiên cứu khoa học tiếp cận trình độ tiên tiến trong khu
          vực và thế giới.
        </p>
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
              <address>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </address>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Số điện thoại:</strong>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Email:</strong>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className={cx('contact-item')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faGlobe} size="2x" />
            </div>
            <div className={cx('contact-details')}>
              <strong>Website:</strong>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className={cx('separator')}></div>
        <div className={cx('map')}>
          <h2>Bản đồ:</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7624143228474!2d100.52318661540216!3d13.736717990357448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29edab6fa4ff5%3A0x4f91e63e8e255f11!2sKhao%20San%20Road!5e0!3m2!1sen!2sth!4v1625737078140!5m2!1sen!2sth"
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
