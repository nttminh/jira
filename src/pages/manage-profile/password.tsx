import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	InputAdornment,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ProfileLayout from '../../containers/ProfileLayout';
import { useAuth } from '../../context/auth/auth.context';
import userAPI from '../../services/userAPI';

type Props = {};

type FormTypes = {
	Password: string;
	NewPassword: string;
};

const Password = (props: Props) => {
	const {
		authState: { user },
		authDispatch,
	} = useAuth();
	const schema = yup
		.object({
			Password: yup
				.string()
				.required()
				.oneOf([user?.passWord], 'Incorrect current password'),
			NewPassword: yup
				.string()
				.required()
				.min(6)
				.notOneOf(
					[yup.ref('Password'), null],
					'Cannot be the same as current password'
				),
		})
		.required();
	const {
		formState: { errors },
		control,
		handleSubmit,
		register,
	} = useForm({ resolver: yupResolver(schema) });

	const [isLoading, setIsLoading] = useState(false);
	const onSubmit = async ({ NewPassword }: FormTypes) => {
		try {
			setIsLoading(true);
			const newUser = {
				...user!,
				passWord: NewPassword,
			};
			const data = await userAPI.editUser({
				...newUser,
			});
			if (data.statusCode === 200) {
				toast.success('Change password successfully');
				authDispatch({
					type: 'UPDATE_USER',
					payload: { property: 'passWord', value: NewPassword },
				});
			} else {
				toast.warning('Change password failed');
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
					Security
				</Typography>
			</Box>
			<Box mb={2}>
				<Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>
					Change your password
				</Typography>
			</Box>
			<Box mt={2}>
				<InputLabel
					htmlFor="component-outlined"
					sx={{ pt: 1, fontSize: 12, fontWeight: 600 }}
				>
					Current password
				</InputLabel>

				<TextField
					required
					error={!!errors?.Password}
					label="Enter current password"
					helperText={errors?.Password?.message as ReactNode}
					variant="standard"
					fullWidth
					sx={{ mb: 4 }}
					{...register('Password')}
					type="password"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<VisibilityIcon />
							</InputAdornment>
						),
					}}
				/>

				<InputLabel
					htmlFor="component-outlined"
					sx={{ pt: 1, fontSize: 12, fontWeight: 600 }}
				>
					New password
				</InputLabel>
				<TextField
					label="Enter new password"
					fullWidth
					required
					type="password"
					variant="standard"
					error={!!errors.NewPassword}
					helperText={errors?.NewPassword?.message as ReactNode}
					{...register('NewPassword')}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<VisibilityIcon />
							</InputAdornment>
						),
					}}
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
					Two-step verification
				</InputLabel>
				<Typography variant="caption">
					Keep your account extra secure with a second login step.
					<Link href="https://support.atlassian.com/organization-administration/resources/">
						Learn more
					</Link>
					.
				</Typography>
			</Box>
		</Box>
	);
};

Password.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
export default Password;
