import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './CourseDetail.module.css';
import { useMutation } from '@tanstack/react-query';
import { Row, Col, Button, Skeleton } from 'antd';
import vectorTitle2 from '/images/vector-title2.svg';
import homeDecor from '/images/home-decor.svg';
import decorLeft from '/images/course-decor-left.svg';
import decorRight from '/images/course-decor-right.svg';
import RichTextDisplay from '../../utils/RichTextDisplay/RichTextDisplay';
import RegistrationTime from '../../components/RegistrationTime/RegistrationTime';
import { getCourse } from '../../apis/course';

const cx = classnames.bind(styles);

function CourseDetail() {
  const [courseData, setCourseData] = useState({});
  const [courseParts, setCourseParts] = useState([]);

  const fetchCourse = useMutation({
    mutationFn: async () => {
      const response = await getCourse();
      const course = response.data.docs[0];
      return course;
    },
    onSuccess: (course) => {
      setCourseData({
        title: course.title,
        description: course.description,
        status: course.status === 'opened' ? true : false,
      });

      setCourseParts(course.parts);
    },
    onError: (error) => {
      console.error('Error fetching course:', error);
    },
  });

  useEffect(() => {
    fetchCourse.mutate();
  }, []);

  return (
    <>
      <div className={cx('posts')}>
        <img className={cx('decor-left')} src={decorLeft} alt="" />
        <img className={cx('decor-right')} src={decorRight} alt="" />
        <div className={cx('posts-title')}>
          <div>
            <span className={cx('title-item', 'title-course')}>Khoá học </span>
            <span className={cx('title-item')}>Generative AI</span>
          </div>
          <img
            className={cx('vector-title')}
            src={vectorTitle2}
            alt="Decor vector"
          />
        </div>
        {fetchCourse.isPending ? (
          <div className={cx('course-description')}>
            <Skeleton
              active
              paragraph={{ rows: 8 }}
              style={{ marginBottom: '20px' }}
            />
            <Skeleton
              active
              paragraph={{ rows: 8 }}
              style={{ marginBottom: '20px' }}
            />
            <Skeleton
              active
              paragraph={{ rows: 8 }}
              style={{ marginBottom: '20px' }}
            />
          </div>
        ) : (
          <>
            <div className={cx('course-title')}>{courseData.title}</div>
            <div className={cx('course-description')}>
              <RichTextDisplay data={courseData.description} />
            </div>
          </>
        )}
        {courseParts.map((part, index) => (
          <div className={cx('course-part')} key={index}>
            <div className={cx('part-content')}>
              <div className={cx('part-title')}>
                PHẦN {index + 1}: {part.partTitle}
              </div>
              <div className={cx('part-description')}>
                <RichTextDisplay data={part.partDetail} />
              </div>
            </div>
            {part.partImage && (
              <img
                className={cx('part-img')}
                src={part.partImage.url}
                alt={part.partImage.alt}
              />
            )}
          </div>
        ))}

        {/* <img
          className={cx('home-decoration')}
          src={homeDecor}
          alt="Home decoration"
        /> */}
        <RegistrationTime atCourse courseStatus={courseData.status} />
      </div>
    </>
  );
}

export default CourseDetail;
