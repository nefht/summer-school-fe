import request from '../utils/request';

const getCourse = async (req, res) => {
  try {
    const response = await request.get('/course');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCourse };
