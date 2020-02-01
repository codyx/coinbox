import rateLimit from 'axios-rate-limit';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const requester = rateLimit(axios.create(), {
  maxRequests: 3,
  perMilliseconds: 1000,
  maxRPS: 3,
});

axiosRetry(requester, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error.response.status === 429,
});

export default requester;
