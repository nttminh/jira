import axios from "./index";
import { PROJECT_URI } from "../constants/api";
import { Project } from "../interface/Project";

class Projects {
  createProject(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/createProject`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  createProjectAuthorize(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/createProjectAuthorize`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  getProjectDetail(id: number) {
    return axios
      .get(`${PROJECT_URI}/getProjectDetail?id=${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  getAllProject() {
    return axios
      .get(`${PROJECT_URI}/getAllProject`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  deleteProject(projectId: number, formData: Project) {
    return axios
      .delete(`${PROJECT_URI}/deleteProject/${projectId}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  updateProject(projectId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updateProject/${projectId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  assignUserProject(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/assignUserProject`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  assignUserTask(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/assignUserTask`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  removeUserFromTask(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/removeUserFromTask`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  removeUserFromProject(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/removeUserFromProject`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  updateStatus(taskId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updateStatus/${taskId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  updateDescription(taskId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updateDescription/${taskId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  updatePriority(taskId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updatePriority/${taskId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  updateTimeTracking(taskId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updateTimeTracking/${taskId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  updateEstimate(taskId: number, formData: Project) {
    return axios
      .put(`${PROJECT_URI}/updateEstimate/${taskId}`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  createTask(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/createTask`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  updateTask(formData: Project) {
    return axios
      .post(`${PROJECT_URI}/updateTask`, { ...formData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  removeTask(taskId: number) {
    return axios
      .delete(`${PROJECT_URI}/removeTask/${taskId}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  getTaskDetail() {
    return axios
      .get(`${PROJECT_URI}/getTaskDetail`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export function getProject() {
  return new Projects();
}
