import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ReactNode, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import ForgotPasswordForm from '../components/features/auth/ForgotPasswordForm';
import SignInForm from '../components/features/auth/SignInForm';
import SignUpForm from '../components/features/auth/SignUpForm';
import BrandLogo from '../components/icons/BrandLogo';
import { useAuth } from '../context/auth/auth.context';

type Props = {};

export enum ActionType {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
	FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://www.atlassian.com/software/jira"
			>
				Jira
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignInPage = (props: Props) => {
	const router = useRouter();
	const { authState, authDispatch } = useAuth();
	const { isAuthenticated, token, user } = authState;
	const [isLoading, setIsLoading] = useState(false);
	const [pageType, setPageType] = useState(ActionType.SIGN_IN);
	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		})
		.required();

	const formControls = useForm({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);

	const handleSignOut = () => {};

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<div className="w-2/3 mx-auto">
					<BrandLogo className="" />
				</div>
				<Box
					sx={{
						marginTop: 4,
						padding: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 10px',
					}}
				>
					{
						{
							SIGN_IN: (
								<SignInForm
									formControls={formControls}
									isLoading={isLoading}
									setIsLoading={setIsLoading}
									setPageType={setPageType}
								/>
							),
							SIGN_UP: <SignUpForm setPageType={setPageType} />,
							FORGOT_PASSWORD: (
								<ForgotPasswordForm setPageType={setPageType} />
							),
						}[pageType]
					}
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};
SignInPage.authDisabled = true;
SignInPage.getLayout = (page: ReactNode) => <>{page}</>;

export default SignInPage;
