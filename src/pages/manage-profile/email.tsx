import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	AlertTitle,
	Box,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ProfileLayout from '../../containers/ProfileLayout';
import { useAuth } from '../../context/auth/auth.context';
import userAPI from '../../services/userAPI';

type Props = {};

const Email = (props: Props) => {
	const {
		authState: { user },
		authDispatch,
	} = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const schema = yup
		.object({
			email: yup.string().email().required(),
		})
		.required();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string }>({ resolver: yupResolver(schema) });

	const onSubmit = async ({ email }: { email: string }) => {
		try {
			setIsLoading(true);
			const newUser = {
				...user!,
				email: email,
			};
			const data = await userAPI.editUser({
				...newUser,
			});
			if (data.statusCode === 200) {
				toast.success('Change email successfully');
				authDispatch({
					type: 'UPDATE_USER',
					payload: { property: 'email', value: email },
				});
			} else {
				toast.warning('Change email failed');
			}
		} catch (error: any) {
			toast.warning(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box sx={{ maxWidth: 584, px: 2 }}>
			<Box mb={2}>
				<Typography variant="h5" sx={{ fontWeight: 500 }} mb={2}>
					Email
				</Typography>
			</Box>
			<Box mb={2}>
				<Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>
					Current email
				</Typography>
				<Typography variant="body2">
					Your current email address is <strong>{user?.email}</strong>
				</Typography>
				<Box display="flex" py={2}>
					<Image
						src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
						width="20"
						height="20"
						alt="google logo"
					/>
					<Typography variant="body2" component="span" ml={1}>
						Log in with Google enabled
					</Typography>
				</Box>
			</Box>
			<Alert severity="warning">
				<AlertTitle>Connected account</AlertTitle>
				Your account is connected to a Google account. Changing the
				email address here will disconnect your account from the Google
				account.
			</Alert>
			<Box mt={2}>
				<InputLabel
					htmlFor="component-outlined"
					sx={{ py: 1, fontSize: 12, fontWeight: 600 }}
				>
					New email address
				</InputLabel>
				<TextField
					required
					id="component-outlined"
					size="small"
					fullWidth
					{...register('email')}
					error={!!errors.email}
					helperText={errors?.email?.message as ReactNode}
					placeholder="Enter new email address"
					sx={{ mb: 2 }}
				/>
				<LoadingButton
					loading={isLoading}
					variant="contained"
					size="small"
					onClick={handleSubmit(onSubmit)}
				>
					Save changes
				</LoadingButton>
			</Box>
			<Box mt={2}>
				<InputLabel
					htmlFor="component-outlined"
					sx={{ py: 1, fontSize: 12, fontWeight: 600 }}
				>
					Email notifications
				</InputLabel>
				<Typography variant="caption">
					To manage what emails you get, visit the{' '}
					<Link href="https://preferences.atlassian.com/main?hid=12e18568547c167f493d3610b0af1617">
						email preferences center
					</Link>
					.
				</Typography>
			</Box>
		</Box>
	);
};

Email.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
export default Email;
