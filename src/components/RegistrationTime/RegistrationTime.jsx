import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegistrationTime.module.css';
import { getCourse } from '../../apis/course';
import formatDate from '../../utils/format-date';
import { Button, Tooltip } from 'antd';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

const cx = classNames.bind(styles);

function RegistrationTime({ atCourse = false }) {
  const [registrationTime, setRegistrationTime] = useState({});
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

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

        const currentTime = Date.now();
        const registrationStartTime = new Date(
          course.registrationTime.registrationStartDate,
        ).getTime();
        const registrationEndTime = new Date(
          course.registrationTime.registrationEndDate,
        ).getTime();
        setRegistrationEnabled(
          currentTime >= registrationStartTime &&
            currentTime <= registrationEndTime,
        );
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
      <Tooltip title={!registrationEnabled ? 'Đã hết hạn đăng ký' : null}>
        <Button
          type="primary"
          className={cx('hidden-btn', { btn: atCourse })}
          onClick={() => setOpenRegistrationModal(true)}
          disabled={!registrationEnabled}
        >
          ĐĂNG KÝ NGAY
        </Button>
      </Tooltip>
      <RegistrationModal
        open={openRegistrationModal}
        setOpen={setOpenRegistrationModal}
      />
    </div>
  );
}

export default RegistrationTime;
