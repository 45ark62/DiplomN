import { client, loggedInClient } from "./index";
export const getPrimaryTest = async () => {
  const res = await client.get("/api/tests/primaryTest");
  return res;
};
export const getSecondaryTest = async () => {
  const res = await loggedInClient.get("/api/tests/secondaryTest");
  return res;
};
export const getPtestRezult = async () => {
  const res = await loggedInClient.get("/api/Ptest");
  return res;
};
