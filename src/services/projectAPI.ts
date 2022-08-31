import {
	CreateProjectContent,
	Project,
	ProjectCategory,
} from '../interface/Project';
import { Response } from '../interface/Response';
import axiosClient from './axiosClient';

const projectAPI = {
	getCategories: () => {
		return axiosClient.get<Response<ProjectCategory[]>>('ProjectCategory');
	},
	createProject: (project: Project) => {
		return axiosClient.post<Response<CreateProjectContent>>(
			'Project/createProjectAuthorize',
			project
		);
	},
	validateToken: (token: string) => {
		return axiosClient.post<string>('Users/TestToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default projectAPI;
