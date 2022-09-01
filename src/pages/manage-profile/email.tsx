import { ReactNode } from "react";
import ProfileLayout from "../../containers/ProfileLayout";

type Props = {};

const Email = (props: Props) => {
	return <div>email</div>;
};

Email.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
export default Email;
