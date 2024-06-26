import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './Posts.module.css';
import {
  Row,
  Col,
  Button,
  Card,
  Typography,
  Input,
  Pagination,
  Skeleton,
  Tooltip,
} from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPostWithParams, getPublishedPosts } from '../../apis/posts';
import fromNow from '../../utils/convert-time';
import vectorTitle from '/images/vector-title.svg';
import formatDate from '../../utils/format-date';
import LoadingSpin from '../../components/LoadingSpin';
import decorLeft from '/images/course-decor-left.svg';
import decorRight from '/images/course-decor-right.svg';

const cx = classnames.bind(styles);
const { Meta } = Card;
const { Text } = Typography;
const { Search } = Input;
const DEFAULT_ITEMS_PER_PAGE = 5;
const DEFAULT_PAGE = 1;

function Posts() {
  const navigate = useNavigate();

  const [postsList, setPostsList] = useState([]);
  const [newestPost, setNewestPost] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);

  const [requestParams, setRequestParams] = useState({
    page: DEFAULT_PAGE,
    limit: DEFAULT_ITEMS_PER_PAGE,
    search: '',
  });

  const fetchPosts = useMutation({
    mutationFn: async () => {
      const response = await getPublishedPosts();
      const list = response.data.docs;

      console.log(response);

      const newPostsList = list.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        representImage: post.representImage
          ? post.representImage.url
          : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        createdAt: post.publishedDate,
      }));

      // Sắp xếp lại theo ngày đăng
      newPostsList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      return newPostsList;
    },
    onSuccess: (newPostsList) => {
      setPostsList(newPostsList);
      if (newPostsList.length > 0) {
        setNewestPost(newPostsList[0]);
        setRecentPosts(newPostsList.slice(1, 4));
      }
    },
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });

  console.log(postsList);

  useEffect(() => {
    fetchPosts.mutate();
  }, []);

  const getPostQuery = useQuery({
    queryKey: ['blogs', requestParams],
    queryFn: async () => {
      const response = await getPostWithParams(requestParams);
      return response;
    },
  });

  const { data: responseData, error, isFetching, isPending } = getPostQuery;

  const handlePaginationChange = async (page, limit) => {
    setRequestParams({
      ...requestParams,
      page,
      limit,
    });
  };

  const onSearch = (value, _e, info) => {
    setRequestParams({
      page: DEFAULT_PAGE,
      limit: DEFAULT_ITEMS_PER_PAGE,
      search: value,
    });
  };

  const handleOpenPostDetail = (id) => {
    navigate(`/post-detail/${id}`);
  };

  return (
    <div className={cx('container')}>
      <img className={cx('decor-left')} src={decorLeft} alt="" />
      <img className={cx('decor-right')} src={decorRight} alt="" />
      {fetchPosts.isPending ? (
        <div className={cx('newest')}>
          <Skeleton
            active
            paragraph={{
              rows: 8,
            }}
          />
        </div>
      ) : (
        <div className={cx('newest')}>
          <img
            className={cx('newest-img')}
            src={newestPost.representImage}
            alt=""
            onClick={() => handleOpenPostDetail(newestPost.id)}
          />
          <div className={cx('newest-container')}>
            <div className={cx('newest-tag')}>Tin mới nhất</div>
            <div
              className={cx('newest-title')}
              onClick={() => handleOpenPostDetail(newestPost.id)}
            >
              {newestPost.title}
            </div>
            <div className={cx('newest-description')}>
              {newestPost.description}
            </div>
            <div className={cx('newest-time')}>
              {fromNow(newestPost.createdAt)}
            </div>
          </div>
        </div>
      )}
      <div className={cx('recent')}>
        <div className={cx('recent-tag')}>
          Tin tức mới
          <img
            className={cx('vector-title')}
            src={vectorTitle}
            alt="Decor vector"
          />
        </div>
        <Row justify={'space-evenly'} style={{ width: '70%' }}>
          {recentPosts.map((post, index) => (
            <Col
              xl={8}
              md={12}
              xs={24}
              className={cx('recent-post')}
              key={index}
            >
              {fetchPosts.isPending ? (
                <Skeleton
                  active
                  paragraph={{
                    rows: 8,
                  }}
                />
              ) : (
                <Card
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
                      style={{
                        color: 'var(--main-font-color)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {fromNow(post.createdAt)}
                    </Text>,
                    <Button
                      type="primary"
                      onClick={() => handleOpenPostDetail(post.id)}
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
              )}
            </Col>
          ))}
        </Row>
      </div>
      <div className={cx('remaining')}>
        <div className={cx('recent-tag')}>
          Tất cả tin tức
          <img
            className={cx('vector-title')}
            src={vectorTitle}
            alt="Decor vector"
          />
        </div>
        <Search
          placeholder="Tìm kiếm tin tức"
          allowClear
          onSearch={onSearch}
          enterButton="Tìm kiếm"
          size="large"
          style={{
            width: '50%',
            margin: '20px 0px 40px',
          }}
        />

        {!isFetching && responseData?.data?.docs.length === 0 && (
          <div className={cx('no-result')}>Không tìm thấy kết quả!</div>
        )}

        {isPending && (
          <div className={cx('loading-spin')}>
            <LoadingSpin />
          </div>
        )}

        {responseData?.data?.docs
          .slice()
          .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
          .map((post) => (
            <div className={cx('remaining-post')} key={post.id}>
              <div className={cx('remaining-img-container')}>
                <img
                  className={cx('remaining-img')}
                  src={
                    post.representImage
                      ? post.representImage.url
                      : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                  }
                  alt=""
                  onClick={() => handleOpenPostDetail(post.id)}
                />
              </div>
              <div className={cx('remaining-content')}>
                <div
                  className={cx('remaining-title')}
                  onClick={() => handleOpenPostDetail(post.id)}
                >
                  {post.title}
                </div>
                <div className={cx('remaining-description')}>
                  {post.description}
                </div>
                <div className={cx('remaining-date')}>
                  <CalendarOutlined /> {formatDate(post.publishedDate)}
                </div>
              </div>
            </div>
          ))}
        {/* {remainingPosts.map((post) => (
          <div className={cx('remaining-post')}>
            <img
              className={cx('remaining-img')}
              src={post.representImage}
              alt=""
            />
            <div className={cx('remaining-content')}>
              <div className={cx('remaining-title')}>{post.title}</div>
              <div className={cx('remaining-description')}>
                {post.description}
              </div>
              <div className={cx('remaining-date')}>
                <CalendarOutlined /> {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
        ))} */}
        <Row style={{ marginTop: 20, marginBottom: 30 }}>
          {responseData?.data?.totalDocs > 0 && (
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pagination
                style={{
                  alignSelf: 'end',
                  margin: '20px 30px',
                }}
                pageSize={requestParams?.limit}
                total={responseData?.data?.totalDocs}
                onChange={handlePaginationChange}
                current={requestParams?.page}
              />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Posts;
