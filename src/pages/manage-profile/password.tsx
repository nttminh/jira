import { ReactNode } from 'react';
import ProfileLayout from '../../containers/ProfileLayout';

type Props = {};

const Password = (props: Props) => {
	return <div>password</div>;
};

Password.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
export default Password;
