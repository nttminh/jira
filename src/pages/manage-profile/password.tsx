import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Box,
	Button,
	InputAdornment,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import ProfileLayout from '../../containers/ProfileLayout';

type Props = {};

const Password = (props: Props) => {
	const schema = yup
		.object({
			Password: yup.string().required(),
			ConfirmedPassword: yup
				.string()
				.oneOf([yup.ref('Password'), null], 'Password is not the same'),
		})
		.required();
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm({ resolver: yupResolver(schema) });
	const [password, setPassword] = useState('');
	const handleChangePassword = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value);
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

				<Controller
					name="Password"
					defaultValue=""
					control={control}
					render={({ field: any }) => (
						<TextField
							error={!!errors?.Password}
							label="Enter current password"
							helperText={errors?.Password?.message as ReactNode}
							variant="standard"
							type="text"
							fullWidth
							sx={{ mb: 4 }}
						/>
					)}
				/>
				<InputLabel
					htmlFor="component-outlined"
					sx={{ pt: 1, fontSize: 12, fontWeight: 600 }}
				>
					New password
				</InputLabel>
				<TextField
					label="Enter new password"
					id="outlined-start-adornment"
					value={password}
					onChange={handleChangePassword}
					fullWidth
					required
					variant="standard"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<VisibilityIcon />
							</InputAdornment>
						),
					}}
					sx={{ mb: 2 }}
				/>
				<Button variant="contained" size="small">
					Save changes
				</Button>
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
