import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PublicIcon from '@mui/icons-material/Public';
import { LoadingButton } from '@mui/lab';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	ClickAwayListener,
	Fade,
	IconButton,
	InputLabel,
	Paper,
	Popper,
	PopperPlacementType,
	TextField,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ProfileLayout from '../../containers/ProfileLayout';
import { useAuth } from '../../context/auth/auth.context';
import userAPI from '../../services/userAPI';

type Props = {};

const ManageProfile = (props: Props) => {
	const {
		authState: { user },
		authDispatch,
	} = useAuth();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);
	const [isLoading, setIsLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [placement, setPlacement] = React.useState<PopperPlacementType>();
	const handleOpenPopper =
		(newPlacement: PopperPlacementType) =>
		(event: React.MouseEvent<any>) => {
			setAnchorEl(event.currentTarget);
			setOpen((prev) => placement !== newPlacement || !prev);
			setPlacement(newPlacement);
		};
	const clickAwayHandler = () => setOpen(false);
	const schema = yup
		.object({
			Name: yup.string().required(),
		})
		.required();

	const {
		formState: { errors },
		control,
		handleSubmit,
		watch,
		resetField,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { Name: user?.name },
	});

	const onSubmit = async ({ Name }: { Name: string }) => {
		try {
			setIsLoading(true);
			const newUser = {
				id: user!.id,
				email: user!.email,
				phoneNumber: user!.phoneNumber,
				passWord: user!.passWord,
				name: Name,
			};
			const data = await userAPI.editUser({
				...newUser,
			});
			if (data.statusCode === 200) {
				toast.success('Change name successfully');
				authDispatch({ type: 'UPDATE_USER_NAME', payload: Name });
			} else {
				toast.warning('Change name failed');
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
					Profile and visibility
				</Typography>
				<Typography variant="body2">
					Manage your personal information, and control which
					information other people see and apps may access.
				</Typography>
				<Typography variant="body2">
					<Link href="https://confluence.atlassian.com/x/6IS8OQ">
						Learn more about your profile and visibility
					</Link>{' '}
					or{' '}
					<Link href="https://www.atlassian.com/legal/privacy-policy">
						view our privacy policy.
					</Link>
				</Typography>
			</Box>
			<Box mb={2}>
				<Typography variant="h6" sx={{ fontWeight: 500 }}>
					Profile photo and header image
				</Typography>
				<Card>
					<CardMedia
						component="img"
						height="140"
						image="https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/1.svg"
						alt="linear gradient from red to white"
					/>
					<CardContent>
						<Box mt={-11}>
							<Avatar
								sx={{
									width: 96,
									height: 96,
									border: '4px solid white',
								}}
								src={`https://ui-avatars.com/api/?name=${user?.name}&bold=true&background=DE350B&color=fff`}
								alt={user?.email || 'Avatar'}
							>
								{user?.name}
							</Avatar>
						</Box>

						<Box textAlign="end">
							<Typography
								display="block"
								variant="caption"
								mb={1}
							>
								Who can see your profile photo?
							</Typography>
							<IconButton
								disabled
								size="small"
								sx={{ ml: 'auto', mr: 0 }}
							>
								<PublicIcon />
								<Typography ml={1}>Anyone</Typography>
							</IconButton>
						</Box>
					</CardContent>
				</Card>
			</Box>
			<Box mb={2}>
				<Typography variant="h6" sx={{ fontWeight: 500 }}>
					About you
				</Typography>
				<Box boxShadow={3} px={2} py={2.5}>
					<Box display="flex">
						<Box minWidth="60%" pr={4}>
							<Controller
								name="Name"
								control={control}
								render={({ field }: any) => (
									<TextField
										error={!!errors?.Name}
										label="Full name"
										helperText={
											errors?.Name?.message as ReactNode
										}
										variant="standard"
										placeholder={user?.name}
										fullWidth
										{...field}
									/>
								)}
							/>
							<Fade in={user?.name !== watch('Name')}>
								<Box textAlign="end" mt={1}>
									<LoadingButton
										loading={isLoading}
										variant="contained"
										size="small"
										sx={{ mr: 1 }}
										onClick={handleSubmit(onSubmit)}
									>
										<DoneIcon fontSize="small" />
									</LoadingButton>
									<Button
										variant="outlined"
										size="small"
										onClick={() => resetField('Name')}
									>
										<ClearIcon fontSize="small" />
									</Button>
								</Box>
							</Fade>
						</Box>
						<Box>
							<Typography
								component="span"
								sx={{ display: 'block', fontSize: 11 }}
							>
								Who can see this?
							</Typography>
							<IconButton
								disabled
								size="small"
								sx={{ ml: 'auto', mr: 0 }}
							>
								<PublicIcon />
								<Typography ml={1}>Anyone</Typography>
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 500 }}>
					Contact
				</Typography>
				<Box boxShadow={3} px={2} py={2.5}>
					<Box display="flex">
						<Box
							minWidth="60%"
							onMouseEnter={(e) =>
								handleOpenPopper('bottom-start')(e)
							}
						>
							<InputLabel sx={{ fontSize: 12, fontWeight: 600 }}>
								Email address
							</InputLabel>
							<Typography py={1}>{user?.email}</Typography>
						</Box>
						<Box>
							<Typography
								component="span"
								sx={{ display: 'block', fontSize: 11 }}
							>
								Who can see this?
							</Typography>
							<IconButton
								disabled
								size="small"
								sx={{ ml: 'auto', mr: 0 }}
							>
								<PublicIcon />
								<Typography ml={1}>Anyone</Typography>
							</IconButton>
							<ClickAwayListener onClickAway={clickAwayHandler}>
								<Popper
									open={open}
									anchorEl={anchorEl}
									placement={placement}
									transition
								>
									{({ TransitionProps }) => (
										<Fade
											{...TransitionProps}
											timeout={350}
										>
											<Paper sx={{ p: 2 }}>
												<Typography>
													Go to the Email tab to
													manage your email address.
												</Typography>
												<Link href="/manage-profile/email">
													Manage your email address
												</Link>
											</Paper>
										</Fade>
									)}
								</Popper>
							</ClickAwayListener>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

ManageProfile.getLayout = (page: ReactNode) => (
	<ProfileLayout>{page}</ProfileLayout>
);
export default ManageProfile;
