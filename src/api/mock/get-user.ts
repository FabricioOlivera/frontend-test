import { AccountObject, BalanceObject } from "../DataObjects";
import mockedDelay from "./mocked-delay";

type UserResponse = {
  code: number;
  msg: string;
  user?: AccountObject;
};

export async function getUser(userID: number): Promise<UserResponse> {
  await mockedDelay(500);

  let accounts = localStorage.getItem("accounts");
  if (accounts === null) {
    return { code: 404, msg: "No users available" };
  }

  const accountObjects = JSON.parse(accounts) as AccountObject[];
  const foundAccountObject = accountObjects.find(
    (accountObj) => accountObj.id === userID
  );

  if (foundAccountObject === undefined) {
    return { code: 404, msg: "Missing account: " + userID };
  }
  return {
    code: 200,
    msg: "Found Account",
    user: foundAccountObject,
  };
}
