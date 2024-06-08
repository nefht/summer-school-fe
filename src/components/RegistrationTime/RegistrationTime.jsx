import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegistrationTime.module.css';
import { getCourse } from '../../apis/course';
import formatDate from '../../utils/format-date';
import { Button, Tooltip } from 'antd';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

const cx = classNames.bind(styles);

function RegistrationTime({ atCourse = false, courseStatus = false }) {
  const [registrationTime, setRegistrationTime] = useState({});
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');

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

        const currentTime = new Date();
        const registrationStartTime = new Date(
          course.registrationTime.registrationStartDate,
        );
        const registrationEndTime = new Date(
          course.registrationTime.registrationEndDate,
        );

        currentTime.setHours(0, 0, 0, 0);
        registrationStartTime.setHours(0, 0, 0, 0);
        registrationEndTime.setHours(0, 0, 0, 0);

        if (currentTime < registrationStartTime) {
          setRegistrationStatus('Chưa đến ngày đăng ký');
          setRegistrationEnabled(false);
        } else if (currentTime > registrationEndTime) {
          setRegistrationStatus('Đã quá hạn đăng ký');
          setRegistrationEnabled(false);
        } else {
          setRegistrationStatus('');
          setRegistrationEnabled(true);
        }
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
      <Tooltip
        title={
          !registrationEnabled
            ? registrationStatus
            : !courseStatus
              ? 'Đã đóng đăng ký khóa học'
              : null
        }
      >
        <Button
          type="primary"
          className={cx('hidden-btn', { btn: atCourse })}
          onClick={() => setOpenRegistrationModal(true)}
          disabled={!registrationEnabled || !courseStatus}
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
