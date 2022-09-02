import PublicIcon from '@mui/icons-material/Public';
import {
	Avatar,
	Box,
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
import ProfileLayout from '../../containers/ProfileLayout';
import { useAuth } from '../../context/auth/auth.context';

type Props = {};

const ManageProfile = (props: Props) => {
	const {
		authState: { user },
	} = useAuth();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);
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
	return (
		<Box sx={{ maxWidth: 584 }}>
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
						alt="green iguana"
					/>
					<CardContent>
						<Box mt={-11}>
							<Avatar
								sx={{
									width: 96,
									height: 96,
									border: '4px solid white',
								}}
								src={user?.avatar}
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
						<Box minWidth="60%">
							<InputLabel sx={{ fontSize: 12, fontWeight: 600 }}>
								Full name
							</InputLabel>
							<TextField
								placeholder={user?.name}
								variant="standard"
							/>
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
