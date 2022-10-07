import axios from "./index";
import { USERS_URI } from "../constants/api";
import { User } from "../interface/User";

class Users {
  getUserList() {
    return axios
      .get(`${USERS_URI}/getUser`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  getUserListById(id) {
    return axios
      .get(`${USERS_URI}/getUserByProjectId?IdProject=${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
 
}

export function getUser() {
  return new Users();
}
