import { Response } from '../interface/Response';
import { User } from '../interface/User';
import {
	SignInContent,
	SignUpContent,
	UserJiraLogin,
	UserJiraModel,
} from '../interface/userAuthentication';
import axiosClient from './axiosClient';

const userAPI = {
	register: (registerInfo: UserJiraModel) => {
		return axiosClient.post<Response<SignUpContent>>('Users/signup', {
			...registerInfo,
		});
	},
	signIn: (loginInfo: UserJiraLogin) => {
		return axiosClient.post<Response<SignInContent>>(
			'Users/signin',
			loginInfo
		);
	},
	editUser: (newUser: User) => {
		return axiosClient.put<Response<string>>('Users/editUser', newUser);
	},
	validateToken: (token: string) => {
		return axiosClient.post<string>('Users/TestToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Và những còn lại liên quan đến user...
};

export default userAPI;
