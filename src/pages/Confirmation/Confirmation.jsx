import classnames from 'classnames/bind';
import styles from './Confirmation.module.css';
import decoration from '/images/confirmation.svg';
import logo from '/images/logo-name.svg';
import decoration1 from '/images/course-decor-right.svg';
import decoration2 from '/images/course-decor-left.svg';

const cx = classnames.bind(styles);

function Confirmation() {
  return (
    <div className={cx('background')}>
      <img className={cx('decoration')} src={decoration} alt="" />
      <div className={cx('form')}>
        {/* <img className={cx('decoration1')} src={decoration1} alt="" />
        <img className={cx('decoration2')} src={decoration2} alt="" /> */}
        <img className={cx('logo')} src={logo} alt="" />
        <div className={cx('text')}>
          Chúc mừng bạn đã đăng ký khóa học{' '}
          <span className={cx('topic')}>Generative AI</span> thành công!
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
