import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ReactNode } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

import {
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import { useAuth } from '../../../../context/auth/auth.context';
import { ActionType } from '../../../../pages/signin';
import userAPI from '../../../../services/userAPI';
import SignInButton from '../../../shared/SignInButton';

interface Props {
	formControls: UseFormReturn<FieldValues, any>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setPageType: React.Dispatch<React.SetStateAction<ActionType>>;
}

export default function SignInForm({
	formControls,
	isLoading,
	setIsLoading,
	setPageType,
}: Props) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = formControls;
	const { authDispatch } = useAuth();

	const onSubmit = async ({ email, password }: any) => {
		setIsLoading(true);
		try {
			const data = await userAPI.signIn({
				email,
				passWord: password,
			});
			// Case: wrong credentials
			if (!data.content.accessToken) {
				setError('email', {
					type: 'focus',
					message: 'Wrong email or password',
				});
				setError('password', {
					type: 'focus',
					message: 'Wrong email or password',
				});
				return;
			}
			// Case: correct credentials
			authDispatch({
				type: 'UPDATE_USER',
				payload: { ...data.content, passWord: password },
			});
			authDispatch({
				type: 'STORE_TOKEN',
				payload: data.content.accessToken,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
			<Typography align="center" className="font-bold">
				Log in to your account
			</Typography>
			<Controller
				name="email"
				defaultValue=""
				control={control}
				render={({ field }) => (
					<TextField
						error={!!errors?.email}
						label="Email"
						helperText={errors?.email?.message as ReactNode}
						type="email"
						autoComplete="email"
						fullWidth
						required
						margin="normal"
						{...field}
					/>
				)}
			/>
			<Controller
				name="password"
				defaultValue=""
				control={control}
				render={({ field }) => (
					<TextField
						error={!!errors?.password}
						label="Password"
						helperText={errors?.password?.message as ReactNode}
						type="password"
						autoComplete="current-password"
						fullWidth
						required
						{...field}
					/>
				)}
			/>

			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<SignInButton
				type="submit"
				fullWidth
				variant="contained"
				loading={isLoading}
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</SignInButton>
			<Grid container spacing={1}>
				<Grid item>
					<Link
						href="#"
						onClick={() => setPageType(ActionType.FORGOT_PASSWORD)}
					>
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link
						href="#"
						onClick={() => setPageType(ActionType.SIGN_UP)}
					>
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
