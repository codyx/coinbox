import Arweave from 'arweave/web';

const arweave = Arweave.init({
  protocol: 'https',
  host: 'arweave.net',
  port: 443,
});

export default arweave;
