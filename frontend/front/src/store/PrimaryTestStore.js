import PrimaryTest from "../pages/PrimaryTest";
import { makeAutoObservable } from "mobx";

class PrimaryTestStore {
  primaryTest = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  setPrimaryTest(primaryTest) {
    this.primaryTest = primaryTest;
  }
}
export default PrimaryTestStore;
