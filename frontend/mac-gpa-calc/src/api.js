import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getGrades = async (data) => {
    const response = await axios.post(`${BASE_URL}/grades`, data);
    return response;
};
