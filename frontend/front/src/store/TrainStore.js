import { makeAutoObservable } from "mobx";

class TrainStore {
  TrainStore = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTrain(TrainStore) {
    this.TrainStore = TrainStore;
  }
}

export default TrainStore;
