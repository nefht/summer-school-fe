import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './PostDetail.module.css';
import { useParams } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
import useMessage from '../../hooks/useMessage';
import { getPostById } from '../../apis/posts';
import RichTextDisplay from '../../utils/PostRichTextDisplay/RichTextDisplay';
import formatDate from '../../utils/format-date';
import decorLeft from '/images/course-decor-left.svg';
import decorRight from '/images/course-decor-right.svg';
import { useMutation } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const cx = classnames.bind(styles);

function PostDetail() {
  const { id } = useParams();
  const { messageApi, contextHolder } = useMessage();

  const [post, setPost] = useState({});
  const [postContent, setPostContent] = useState();

  const fetchPostById = useMutation({
    mutationFn: async () => {
      const response = await getPostById(id);
      return response;
    },
    onSuccess: (response) => {
      setPost(response.data);
      setPostContent(response.data.content);
    },
    onError: (error) => {
      messageApi.error(error.message);
    },
  });

  useEffect(() => {
    fetchPostById.mutate(id);
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className={cx('container')}>
        <img className={cx('decor-left')} src={decorLeft} alt="" />
        <img className={cx('decor-right')} src={decorRight} alt="" />
        <div className={cx('meta')}>
          {fetchPostById.isPending ? (
            <Skeleton.Input
              active
              block
              size="large"
              style={{ margin: '80px 0px 50px' }}
            />
          ) : (
            <div className={cx('title')}>{post.title}</div>
          )}
          <div className={cx('date')}>
            <CalendarOutlined />
            <div>Ngày đăng: {formatDate(post.publishedDate)}</div>
          </div>
        </div>
        {fetchPostById.isPending ? (
          <div style={{ width: '60%' }}>
            <Skeleton
              active
              paragraph={{
                rows: 10,
              }}
            />
          </div>
        ) : (
          <RichTextDisplay data={postContent} />
        )}
      </div>
    </>
  );
}

export default PostDetail;
