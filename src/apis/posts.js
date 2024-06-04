import request from '../utils/request';

// Get tất cả posts
const getPosts = async (req, res) => {
  try {
    const response = await request.get('/posts');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts được published
const getPublishedPosts = async (req, res) => {
  try {
    const response = await request.get('/posts/published');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {object} params
 * @param {number} params.pageNumber
 * @param {number} params.pageSize
 * @param {string} params/search
 * @returns
 */
const getPostWithParams = async (params) => {
  const { page, limit, search } = params;
  try {
    const response = await request.get(`/posts`, {
      params: {
        page,
        limit,
        where: {
          or: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getPostById = async (id) => {
  try {
    const response = await request.get(`/posts/${id}`);
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPosts, getPublishedPosts, getPostWithParams, getPostById };
