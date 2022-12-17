import Arweave from 'arweave';
import {ProposalProps} from "../util/sharedTypes";

const arweaveWalletKey = process.env.ARW_WALLET_KEY;
const useArweave = process.env.ARW_USE === "1";
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
});

export default async function saveProposalToArweave(proposal: ProposalProps) {
  if (arweaveWalletKey && useArweave) {
    const wallet = JSON.parse(arweaveWalletKey);
    const walletAddress = await arweave.wallets.jwkToAddress(wallet);
    console.log(`Wallet: ${walletAddress}`);
    const balance = await arweave.wallets.getBalance(wallet);
    console.log(`Balance: ${balance}`);

    const transaction = await arweave.createTransaction(
      {
        data: JSON.stringify(proposal),
      },
      wallet,
    );

    await arweave.transactions.sign(transaction, wallet).then(() => {
      console.log('Transaction successfully signed');
      const transactionId = transaction.id;
      console.log(`Transaction ID: ${transactionId}`);
      const transactionData = transaction.get('data', {
        decode: true,
        string: true,
      });
      console.log(`Transaction Data: ${transactionData}`);
    });

    await arweave.transactions.post(transaction).then(() => {
      console.log('Transaction posted successfully');
      const transactionId = transaction.id;
      console.log(`Transaction ID: ${transactionId}`);
      const transactionData = transaction.get('data', {
        decode: true,
        string: true,
      });
      console.log(`Transaction Data: ${transactionData}`);

      return {transactionId: transactionId, hash: proposal.currentHash};
    });
  } else {
    if (useArweave) {
      console.log('No wallet key found');
    } else {
      console.log('Arweave disabled', proposal);
    }
    return {transactionId: null, hash: proposal.currentHash};
  }
}

