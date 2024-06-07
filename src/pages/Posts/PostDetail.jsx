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

const cx = classnames.bind(styles);

function PostDetail() {
  const { id } = useParams();
  const { messageApi, contextHolder } = useMessage();

  const [post, setPost] = useState({});
  const [postContent, setPostContent] = useState();

  // Get post by id
  useEffect(() => {
    (async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
        setPostContent(response.data.layout[0].content);
      } catch (error) {
        messageApi.error(error.message);
      }
    })();
  }, [id]);

  console.log(post);

  return (
    <>
      {contextHolder}
      <div className={cx('container')}>
        <img className={cx('decor-left')} src={decorLeft} alt="" />
        <img className={cx('decor-right')} src={decorRight} alt="" />
        <div className={cx('meta')}>
          <div className={cx('title')}>{post.title}</div>
          <div className={cx('date')}>
            <CalendarOutlined />
            <div>Ngày đăng: {formatDate(post.publishedDate)}</div>
          </div>
        </div>
        <RichTextDisplay data={postContent} />
      </div>
    </>
  );
}

export default PostDetail;
