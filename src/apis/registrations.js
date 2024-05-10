import request from '../utils/request';

const getRegistrations = async (req, res) => {
  try {
    const response = await request.get('/registrations');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getRegistrations };
