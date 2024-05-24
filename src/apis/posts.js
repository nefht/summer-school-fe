import request from '../utils/request';

const getPosts = async (req, res) => {
  try {
    const response = await request.get('/posts');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPosts };
