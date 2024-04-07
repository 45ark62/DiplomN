import { client, loggedInClient } from "./index";

export const getStatAttempts = async () => {
  const res = await loggedInClient.get("/api/userHistory");
  return res;
};
export const getStatAttemptsForTrainPage = async () => {
  const res = await loggedInClient.get("/api/trainHistory");
  return res;
};
