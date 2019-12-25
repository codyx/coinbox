import Arweave from 'arweave/web';

const arweave = Arweave.init({
  protocol: 'https',
  host: 'arweave.net',
  port: 443,
});

export const createWalletFromJwk = async (jwk) => ({
  jwk,
  address: await arweave.wallets.jwkToAddress(jwk),
});

export default arweave;
