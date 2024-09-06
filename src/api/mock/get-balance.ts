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

export async function getBalances(userID: number): Promise<BalanceResponse> {
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
    return { code: 404, msg: "Missing id: " + userID };
  }
  return {
    code: 200,
    msg: "Found balances history",
    balanceHistory: foundBalanceObject.balanceHistory.map((value) =>
      Number.parseInt(value)
    ),
  };
}
