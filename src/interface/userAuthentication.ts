export interface UserJiraModel {
	email: string;
	passWord: string;
	name: string;
	phoneNumber: string;
}

export interface SignUpResponse {
	statusCode: number;
	message: string;
	content: SignUpContent;
	dateTime: Date;
}

export interface SignUpContent {
	email: string;
	passWord: string;
	name: string;
	phoneNumber: string;
}

export interface UserJiraLogin {
	email: string;
	passWord: string;
}

export interface SignInResponse {
	statusCode: number;
	message: string;
	content: SignInContent;
	dateTime: Date;
}

export interface SignInContent {
	id: number;
	email: string;
	avatar: string;
	phoneNumber: string;
	name: string;
	accessToken: string;
}
