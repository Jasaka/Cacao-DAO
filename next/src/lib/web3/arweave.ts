import Arweave from 'arweave';
import {ProposalProps} from "../../util/sharedTypes";
import { errorLog, verboseLog } from "../util/util"

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
    verboseLog(`Wallet: ${walletAddress}`);
    const balance = await arweave.wallets.getBalance(wallet);
    verboseLog(`Balance: ${balance}`);

    const transaction = await arweave.createTransaction(
      {
        data: JSON.stringify(proposal),
      },
      wallet,
    );

    await arweave.transactions.sign(transaction, wallet).then(() => {
      verboseLog('Transaction successfully signed');
      const transactionId = transaction.id;
      verboseLog(`Transaction ID: ${transactionId}`);
      const transactionData = transaction.get('data', {
        decode: true,
        string: true,
      });
      verboseLog(`Transaction Data: ${transactionData}`);
    });

    await arweave.transactions.post(transaction).then(() => {
      verboseLog('Transaction posted successfully');
      const transactionId = transaction.id;
      verboseLog(`Transaction ID: ${transactionId}`);
      const transactionData = transaction.get('data', {
        decode: true,
        string: true,
      });
      verboseLog(`Transaction Data: ${transactionData}`);
      const transactionResult = {transactionId: transactionId, hash: proposal.currentHash}
      console.log('transactionResult', transactionResult)
      return transactionResult
    });
  } else {
    if (useArweave) {
      errorLog('No wallet key found');
    } else {
      verboseLog('Arweave disabled', proposal);
    }
    return {transactionId: null, hash: proposal.currentHash};
  }
}

