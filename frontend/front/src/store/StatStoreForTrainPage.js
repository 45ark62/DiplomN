import { makeAutoObservable } from "mobx";

class StatisticStoreForTrainPage {
  StatAttemptStoreForTrainPage = [];

  constructor() {
    makeAutoObservable(this);
  }
  setStat(StatAttemptStoreForTrainPage) {
    this.StatAttemptStoreForTrainPage = StatAttemptStoreForTrainPage;
  }
}
export default StatisticStoreForTrainPage;
