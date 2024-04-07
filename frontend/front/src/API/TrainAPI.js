import { client, loggedInClient } from "./index";

export const getCardTrain = async () => {
  const res = await client.get("/api/cards/");
  return res;
};
export const getCardTrainTests = async () => {
  const res = await client.get("/api/cardsTrain/");
  return res;
};
