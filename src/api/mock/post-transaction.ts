import { BalanceObject } from "../DataObjects";
import mockedDelay from "./mocked-delay";

type BalanceResponse = {
  code: number;
  msg: string;
  balanceHistory?: number[];
};

function createStorage() {
  const balances = JSON.stringify([]);
  localStorage.setItem("balances", balances);
  return balances;
}

export async function postTransaction(
  userID: number,
  deltaOperation: number
): Promise<BalanceResponse> {
  await mockedDelay(500);

  let balances = localStorage.getItem("balances");
  if (balances === null) {
    balances = createStorage();
  }

  const balanceObjects = JSON.parse(balances) as BalanceObject[];
  const foundBalanceObject = balanceObjects.find(
    (balanceObj) => balanceObj.userID === userID
  );

  if (foundBalanceObject === undefined) {
    if (deltaOperation >= 0) {
      balanceObjects.push({
        userID: userID,
        balanceHistory: [deltaOperation + ""],
      });
      localStorage.setItem("balances", JSON.stringify(balanceObjects));
      return { code: 201, msg: "New Balance History created" + deltaOperation };
    } else {
      return { code: 406, msg: "Initial balance can't be negative" };
    }
  }

  const foundBalanceHistory = foundBalanceObject.balanceHistory;
  const lastBalance =
    foundBalanceHistory.length > 0
      ? Number.parseInt(foundBalanceHistory[foundBalanceHistory.length - 1])
      : 0;

  if (lastBalance + deltaOperation < 0) {
    return { code: 406, msg: "Cannot extract more money than you have" };
  }

  foundBalanceHistory.push(lastBalance + deltaOperation + "");
  localStorage.setItem("balances", JSON.stringify(balanceObjects));
  return { code: 201, msg: "New balance created successfully" };
}
