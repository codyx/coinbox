import rateLimit from 'axios-rate-limit';
import axios from 'axios';

const requester = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 1000,
  maxRPS: 2,
});

export default requester;
