import Web3 from "web3";

import { getDecimalFromAmount } from "../utils/numbers";
import erc20Abi from "../assets/erc20Abi.json";

window.web3 = null;

export class EthereumService {
    static getFromWei(amount) {
        return window.web3.utils.fromWei(amount, "ether");
    }

    static async getEthAccountBalance(address) {
        const balance = await window.web3.eth.getBalance(address);

        return parseFloat(EthereumService.getFromWei(balance));
    }

    static async getEthAccount_TokenBalances(walletAddress, tokens) {
        const batchOfPromises = await Promise.all(
            tokens.map(({ address, _ }) =>
                EthereumService.getEthERC20Account_TokenBalance(
                    address,
                    walletAddress
                )
            )
        );

        return batchOfPromises.map((balanceNative, index) => ({
            balanceNative,
            name: tokens[index]?.name,
            address: tokens[index]?.address
        }));
    }

    static async getEthERC20Account_TokenBalance(tokenContractAddress, walletAddress) {
        const contractOf = new window.web3.eth.Contract(
            erc20Abi,
            tokenContractAddress
        );

        try {
            const balance = await contractOf.methods.balanceOf(walletAddress).call();

            return getDecimalFromAmount(EthereumService.getFromWei(balance));
        } catch (err) {
            console.log('Error fetching token balance:', err.message)

            return null;
        }
    }

    static setWeb3Provider() {
        if (window.ethereum && !window.web3) {
            window.web3 = new Web3(Web3.givenProvider);
        }
    }
}
