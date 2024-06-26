import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Home.module.css';
import { Row, Col, Button, Card, Typography, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useMessage from './../../hooks/useMessage';
import { getPublishedPosts } from './../../apis/posts';
import { getCourse } from '../../apis/course';
import RichTextDisplay from '../../utils/RichTextDisplay/RichTextDisplay';
import homeImg from '/images/home.svg';
import exploreButton from '/images/explore-btn.svg';
import vectorTitle from '/images/vector-title.svg';
import vectorTitle2 from '/images/vector-title2.svg';
import homeDecor from '/images/home-decor.svg';
import certificate from '/images/certificate-vi.svg';
import lecturers from '/images/lecturers.svg';
import icon1 from '/images/home-icon1.svg';
import icon2 from '/images/home-icon2.svg';
import icon3 from '/images/home-icon3.svg';
import fromNow from '../../utils/convert-time';
import RegistrationTime from '../../components/RegistrationTime/RegistrationTime';

const cx = classNames.bind(styles);
const { Meta } = Card;
const { Text } = Typography;

function Home() {
  const { messageApi, contextHolder } = useMessage();
  const navigate = useNavigate();

  const scrollToRef = useRef(null);

  const [postsList, setPostsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 4;

  const [courseData, setCourseData] = useState({});
  const [courseParts, setCourseParts] = useState([]);

  // Fetch posts
  useEffect(() => {
    (async () => {
      try {
        const response = await getPublishedPosts();
        const list = response.data.docs;

        const newPostsList = list.slice(0, 16).map((post) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          representImage: post.representImage
            ? post.representImage.url
            : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          createdAt: post.publishedDate,
        }));

        newPostsList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setPostsList(newPostsList);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    })();
  }, []);

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

  // Automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % postsList.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [postsList.length]);

  const startIndex = currentPage;
  const currentPosts = [
    ...postsList.slice(startIndex, startIndex + postsPerPage),
    ...postsList.slice(
      0,
      Math.max(0, startIndex + postsPerPage - postsList.length),
    ),
  ].slice(0, postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % postsList.length);
  };

  const handlePrevPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage - 1 + postsList.length) % postsList.length,
    );
  };

  const handleScrollClick = () => {
    console.log(scrollToRef);
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {contextHolder}
      <div className={cx('home-page')}>
        <div className={cx('home-title')}>
          <img className={cx('home-img')} src={homeImg} alt="Home Image" />
          <img
            className={cx('explore-btn-img')}
            src={exploreButton}
            alt=""
            onClick={handleScrollClick}
          />
          <Button
            type="primary"
            className={cx('explore-btn')}
            onClick={() => navigate('/course-detail')}
          >
            KHÁM PHÁ THÊM
          </Button>
        </div>
        <div className={cx('posts')}>
          <div className={cx('posts-title')}>
            Tin tức nổi bật
            <img
              className={cx('vector-title')}
              src={vectorTitle}
              alt="Decor vector"
            />
          </div>
          <div className={cx('posts-list')}>
            {currentPosts.map((post, index) => (
              <Card
                className={cx('post')}
                key={index}
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    className={cx('post-image')}
                    alt="Post"
                    src={post.representImage}
                  />
                }
                actions={[
                  <Text
                    key="time"
                    disabled
                    style={{ color: 'var(--main-font-color)' }}
                  >
                    {fromNow(post.createdAt)}
                  </Text>,
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`post-detail/${post.id}`);
                    }}
                  >
                    Xem thêm
                  </Button>,
                ]}
              >
                <Meta
                  title={
                    <Tooltip title={post.title}>
                      <span className={cx('post-title')}>{post.title}</span>
                    </Tooltip>
                  }
                  description={
                    <div className={cx('post-description')}>
                      {post.description}
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
          <div className={cx('pagination')}>
            <Button
              style={{
                width: 70,
              }}
              icon={<LeftOutlined style={{ fontSize: 25 }} />}
              className={cx('pagination-btn')}
              onClick={handlePrevPage}
              disabled={postsList.length <= postsPerPage}
            />
            <Button
              style={{
                width: 70,
              }}
              icon={<RightOutlined style={{ fontSize: 25 }} />}
              className={cx('pagination-btn')}
              onClick={handleNextPage}
              disabled={postsList.length <= postsPerPage}
            />
          </div>
        </div>
        <div className={cx('posts')} ref={scrollToRef}>
          <div className={cx('posts-title')}>
            <div>
              <span className={cx('title-item', 'title-course')}>
                Khoá học{' '}
              </span>
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
          <Row
            style={{ rowGap: '60px', width: '80%', marginTop: '40px' }}
            justify={'space-evenly'}
          >
            {courseParts.map((part, index) => (
              <Col
                md={12}
                sm={24}
                xs={24}
                xl={8}
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className={cx('course-part')}>
                  {part.partImage && (
                    <img
                      className={cx('part-img')}
                      src={part.partImage.url}
                      alt={part.partImage.alt}
                    />
                  )}
                  <div className={cx('part-title')}>{part.partTitle}</div>
                  <div className={cx('part-description')}>
                    {part.partDescription}
                  </div>
                  <div className={cx('part-index')}>Phần {index + 1}</div>
                </div>
              </Col>
            ))}
          </Row>
          <Button
            type="primary"
            className={cx('course-btn')}
            onClick={() => navigate('/course-detail')}
          >
            Xem chi tiết
          </Button>
          <img
            className={cx('home-decoration')}
            src={homeDecor}
            alt="Home decoration"
          />
          <RegistrationTime />
        </div>
        <div className={cx('certificate')}>
          <div>
            <div className={cx('tag')}>Lợi ích sau khóa học</div>
            <div className={cx('tag-title')}>Nhận chứng chỉ khóa học</div>
            <div className={cx('normal-text')}>
              Bạn sẽ nhận chứng chỉ khóa học sau khi:{' '}
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon1} />
              <div className={cx('normal-text')}>
                Tham gia đầy đủ và hoàn thành các buổi học trực tuyến hoặc trực
                tiếp.
              </div>
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon2} />
              <div className={cx('normal-text')}>
                Thực hiện các bài tập và dự án thực hành nhằm áp dụng kiến thức
                đã học.
              </div>
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon3} />
              <div className={cx('normal-text')}>
                Đạt kết quả tối thiểu trong bài kiểm tra cuối khóa để chứng minh
                sự hiểu biết về chủ đề.
              </div>
            </div>
          </div>
          <img src={certificate} alt="Certificate" />
        </div>

        <div className={cx('lecturers')}>
          <img src={lecturers} alt="Lecturers" />

          <div>
            <div className={cx('tag', 'tag-lecturers')}>Đội ngũ giảng viên</div>
            <div className={cx('tag-title', 'tag-title-lectures')}>
              Giảng viên khóa học
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon1} />
              <div className={cx('normal-text')}>
                Các chuyên gia có nhiều năm kinh nghiệm trong lĩnh vực trí tuệ
                nhân tạo, đặc biệt là trong nghiên cứu và phát triển các mô hình
                Generative AI.
              </div>
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon2} />
              <div className={cx('normal-text')}>
                Giảng viên sử dụng phương pháp giảng dạy kết hợp giữa lý thuyết
                nền tảng và các bài tập thực hành thực tiễn, giúp học viên dễ
                dàng nắm bắt và áp dụng kiến thức.
              </div>
            </div>
            <div className={cx('option')}>
              <img className={cx('icon-img')} src={icon3} />
              <div className={cx('normal-text')}>
                Giảng viên luôn sẵn sàng hỗ trợ học viên thông qua các buổi tư
                vấn riêng, giải đáp thắc mắc và cung cấp phản hồi chi tiết về
                các bài tập và dự án.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
