import { makeAutoObservable } from "mobx";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../API/index";

class UserStore {
  _user = {};
  _loggedIn = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }

  setUser(user) {
    this._user = user;
    saveUserToLocalStorage(user); // Save user to local storage when it's set
  }

  get user() {
    return this._user;
  }

  setLoggedIn(loggedIn) {
    this._loggedIn = loggedIn;
  }

  get loggedIn() {
    return this._loggedIn;
  }

  loadUserFromLocalStorage() {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      this.setUser(storedUser);
    }
  }
}

export default UserStore;
