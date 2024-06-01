import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegistrationTime.module.css';
import { getCourse } from '../../apis/course';
import formatDate from '../../utils/format-date';
import { Button } from 'antd';

const cx = classNames.bind(styles);

function RegistrationTime({ atCourse = false }) {
  const [registrationTime, setRegistrationTime] = useState({});
  // Fetch course
  useEffect(() => {
    (async () => {
      try {
        const response = await getCourse();
        const course = response.data.docs[0];
        setRegistrationTime({
          start: formatDate(course.registrationTime.registrationStartDate),
          end: formatDate(course.registrationTime.registrationEndDate),
        });
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    })();
  }, []);

  return (
    <div className={cx('wrapper', { 'course-page': atCourse })}>
      <div className={cx('title')}>THỜI GIAN ĐĂNG KÝ</div>
      <div className={cx('line')}></div>
      <div className={cx('from')}>từ</div>
      <div className={cx('to')}>đến</div>
      <div className={cx('time', 'start-time')}>{registrationTime.start}</div>
      <div className={cx('time', 'end-time')}>{registrationTime.end}</div>
      <Button type="primary" className={cx('hidden-btn', { 'btn': atCourse })}>
        ĐĂNG KÝ NGAY
      </Button>
    </div>
  );
}

export default RegistrationTime;
