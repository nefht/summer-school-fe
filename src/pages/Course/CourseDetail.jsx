import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './CourseDetail.module.css';
import { Row, Col, Button } from 'antd';
import vectorTitle2 from '/images/vector-title2.svg';
import homeDecor from '/images/home-decor.svg';
import RichTextDisplay from '../../utils/RichTextDisplay/RichTextDisplay';
import RegistrationTime from '../../components/RegistrationTime/RegistrationTime';
import { getCourse } from '../../apis/course';

const cx = classnames.bind(styles);

function CourseDetail() {
  const [courseData, setCourseData] = useState({});
  const [courseParts, setCourseParts] = useState([]);

  // Fetch course
  useEffect(() => {
    (async () => {
      try {
        const response = await getCourse();
        const course = response.data.docs[0];

        setCourseData({
          title: course.title,
          description: course.description,
        });

        setCourseParts(course.parts);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    })();
  }, []);

  return (
    <>
      <div className={cx('posts')}>
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
        <div className={cx('course-title')}>{courseData.title}</div>
        <div className={cx('course-description')}>
          <RichTextDisplay data={courseData.description} />
        </div>
        {courseParts.map((part, index) => (
          <div className={cx('course-part')} key={index}>
            <div className={cx('part-content')}>
              <div className={cx('part-title')}>
                PHẦN {index + 1}:{part.partTitle}
              </div>
              <div className={cx('part-description')}>
                <RichTextDisplay data={part.partDetail} />
              </div>
            </div>
            <img
              className={cx('part-img')}
              src={part.partImage.url}
              alt={part.partImage.alt}
            />
          </div>
        ))}

        <img
          className={cx('home-decoration')}
          src={homeDecor}
          alt="Home decoration"
        />
        <RegistrationTime atCourse />
      </div>
    </>
  );
}

export default CourseDetail;
