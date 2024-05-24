import { useEffect, useState } from 'react';
import useMessage from './../../hooks/useMessage';
import { getPosts } from './../../apis/posts';
import RichTextDisplay from './../../utils/RichTextDisplay/RichTextDisplay';

function Home() {
  const { messageApi, contextHolder } = useMessage();
  const [blogData, setBlogData] = useState();

  // Mẫu gọi GET API
  useEffect(() => {
    (async () => {
      try {
        const response = await getPosts();
        // console.log('Registrations fetched:', response.data.docs);
        setBlogData(response.data.docs[0].layout[0].content);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    })();
  }, []);

  // console.log(blogData);

  return (
    <>
      {contextHolder}
      <RichTextDisplay data={blogData} />
    </>
  );
}

export default Home;
