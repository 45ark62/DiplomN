import PrimaryTest from "../pages/PrimaryTest";
import { makeAutoObservable } from "mobx";

class SecondTestStore {
  secondTest = [];

  constructor() {
    makeAutoObservable(this);
  }
  setSecondTest(secondTest) {
    this.secondTest = secondTest;
  }
}
export default SecondTestStore;
