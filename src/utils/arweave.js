import Arweave from 'arweave/web';
import axios from 'axios';

const arweave = Arweave.init({
  protocol: 'https',
  host: 'arweave.net',
  port: 443,
});

export const createWalletFromJwk = async (jwk) => ({
  jwk,
  address: await arweave.wallets.jwkToAddress(jwk),
});

export const createAndPostTransaction = async (payload, jwk) => {
  const tx = await arweave
    .createTransaction({ data: JSON.stringify(payload) }, jwk);
  tx.addTag('coinbox-prediction', 'test2');
  await arweave
    .transactions
    .sign(tx, jwk);

  const { status } = await arweave
    .transactions
    .post(tx);
  return { tx, status };
};

export const getPredictionsTxs = async (address) => {
  const txids = await arweave.arql({
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'from',
      expr2: address,
    },
    expr2: {
      op: 'equals',
      expr1: 'coinbox-prediction',
      expr2: 'test2',
    },
  });

  const txs = txids.map(async (txId) => arweave
    .transactions
    .get(txId));

  return Promise.all(txs);
};

export const getTimestampFromTxId = async (txId) => {
  const { status, confirmed } = await arweave
    .transactions
    .getStatus(txId);
  if (status !== 200) {
    console.error(`Block status (txId: "${txId}") is not OK`);
    return -1;
  }
  const { data } = await axios(`https://arweave.net/block/height/${confirmed.block_height}`);
  return data.timestamp;
};

export const listPredictions = async (address, reduce) => {
  let txs = await getPredictionsTxs(address);
  const totalCount = txs.length;
  if (reduce && typeof reduce === 'function') {
    txs = reduce(txs);
  }
  const predictions = txs.map(async (tx) => ({
    ...JSON.parse(await arweave.transactions.getData(tx.id, { decode: true, string: true })),
    timestamp: await getTimestampFromTxId(tx.id),
    id: tx.id,
  }));
  return {
    totalCount,
    txs: await Promise.all(predictions),
  };
};

export default arweave;
