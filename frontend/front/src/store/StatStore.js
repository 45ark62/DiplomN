import { makeAutoObservable } from "mobx";

class StatisticStore {
  StatAttemptStore = [];

  constructor() {
    makeAutoObservable(this);
  }
  setStat(StatAttemptStore) {
    this.StatAttemptStore = StatAttemptStore;
  }
}
export default StatisticStore;
