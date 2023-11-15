import { BigNumber, ethers } from "ethers";
import { contract, tokenContract } from "./contract";
import { toEth, toWei as toWeiFromUtils } from "./utils";

export async function swapEthToToken(tokenName, amount) {
  try {
    let tx = { value: toWei(amount) };
    const contractObj = await contract();
    const data = await contractObj.swapEthToToken(tokenName, tx);

    const receipt = await data.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function hasValidAllowance(owner, tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.allowance(
      owner,
      "0x8093b4CfAeE8ed9BC3902fDF8C1ca970bdd8991e"
    );
    const result = BigNumber.from(data.toString()).get(
      BigNumber.from(toWei(amount))
    );
    return result;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function swapTokenToEth(tokenName, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToEth(tokenName, toWei(amount));
    const receipt = await data.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function swapTokenToToken(srcToken, destToken, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToToken(
      srcToken,
      destToken,
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function getTokenBalance(tokenName, address) {
  const contractObj = await contract();
  const balance = contractObj.getBalance(tokenName, address);
  return balance;
}

export async function getTokenAddress(tokenName) {
  try {
    const contractObj = await contract();
    const address = contractObj.getTokenAddress(tokenName);
    return address;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function increaseAllowance(tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.approve(
      "0x8093b4CfAeE8ed9BC3902fDF8C1ca970bdd8991e",
      toWei(amount)
    );
    const receipt = await data.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function getAllHistory() {
  try {
    const contractObj = await contract();
    const getAllHistory = await contractObj.getAllHistory();
    const historyTransaction = getAllHistory.map((history, i) => ({
      historyId: history.historyId.toNumber(),
      tokenA: history.tokenA,
      tokenB: history.tokenB,
      inputValue: toEth(history?.inputValue),
      outputValue: toEth(history?.outputValue),
      userAddress: history.userAddress,
    }));
    return historyTransaction;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei.toString();
}

function parseErrorMsg(error) {
  const json = JSON.parse(stringify(error));
  return json?.reason || json?.error?.message;
}
