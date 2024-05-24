import request from '../utils/request';

const getImages = async (req, res) => {
  try {
    const response = await request.get('/media');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImageById = async (id) => {
  try {
    const response = await request.get(`media/${id}`);
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getImages, getImageById };
