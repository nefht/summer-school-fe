import request from '../utils/request';

const getAboutUs = async (req, res) => {
  try {
    const response = await request.get('/about-us');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAboutUs };
