import { AccountObject } from "../DataObjects";
import mockedDelay from "./mocked-delay";
import { postTransaction } from "./post-transaction";

type RegisterResponse = {
  code: number;
  msg: string;
  id: number;
};

function createStorage() {
  const accounts = JSON.stringify([]);
  localStorage.setItem("accounts", accounts);
  return accounts;
}

export async function register(
  newAccount: {
    name: string;
    lastName: string;
    accountNumber: string;
  },
  initialBalance: number
): Promise<RegisterResponse> {
  await mockedDelay(500);

  let accounts = localStorage.getItem("accounts");
  if (accounts === null) {
    accounts = createStorage();
  }

  const accountsObjects = JSON.parse(accounts) as AccountObject[];
  const foundAccount = accountsObjects.find(
    (account) => account.accountNumber === newAccount.accountNumber
  );

  if (foundAccount !== undefined) {
    return { code: 200, msg: "ok", id: foundAccount.id };
  }

  const newID = accountsObjects.length;

  accountsObjects.push({ ...newAccount, id: newID });

  localStorage.setItem("accounts", JSON.stringify(accountsObjects));
  const transaction = await postTransaction(newID, initialBalance);
  console.log(transaction);
  return { code: 201, msg: "User created", id: newID };
}
