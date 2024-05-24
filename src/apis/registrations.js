import request from '../utils/request';

const getRegistrations = async (req, res) => {
  try {
    const response = await request.get('/registrations');
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {object} body
 * @param {string} body.name
 * @param {string} body.dateOfBirth
 * @param {string} body.email
 * @param {string} body.gender
 * @param {string} body.targetGroup
 * @param {string} body.schoolOrCompany
 * @param {string} body.knowledgeLevel
 * @param {string} body.expectation
 */

const postRegistration = async (body) => {
  try {
    const response = await request.post(body);
    return response;
  } catch (error) {
    return error;
  }
};

export { getRegistrations, postRegistration };
