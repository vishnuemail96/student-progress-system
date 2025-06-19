import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/codeforces';

const getUserInfo = (handle) => axios.get(`${BASE_URL}/user/${handle}`).then(res => res.data);
const getContests = (handle) => axios.get(`${BASE_URL}/contests/${handle}`).then(res => res.data);
const getSolved = (handle) => axios.get(`${BASE_URL}/solved/${handle}`).then(res => res.data);

export default { getUserInfo, getContests, getSolved };
