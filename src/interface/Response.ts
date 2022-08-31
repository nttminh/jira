export interface Response<T> {
	statusCode: number;
	message: string;
	content: T;
	dateTime: string;
}
