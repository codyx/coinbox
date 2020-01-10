import rateLimit from 'axios-rate-limit';
import axios from 'axios';

const requester = rateLimit(axios.create(), {
  maxRequests: 3,
  perMilliseconds: 1000,
  maxRPS: 3,
});

export default requester;
