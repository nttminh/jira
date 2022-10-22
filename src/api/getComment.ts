import axios from "./index";
import { COMMENT_URI } from "../constants/api";
import { Comment } from "../interface/Comment";

class Comments {
  insertComment(formData: Comment) {
    return axios
      .post(`${COMMENT_URI}/insertComment`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  getAllComment() {
    return axios
      .get(`${COMMENT_URI}/getAll`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  insertCommment(taskId: number, contentComment: string) {
    return axios
      .post(`${COMMENT_URI}/insertCommment?taskId=${taskId}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  deleteCommment(idComment: number) {
    return axios
      .delete(`${COMMENT_URI}/deleteComment?idComment=${idComment}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  updateCommment(idComment: number, formData: Comment) {
    return axios
      .put(`${COMMENT_URI}/updateComment/${idComment}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export function getComment() {
  return new Comments();
}
