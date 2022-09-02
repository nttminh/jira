import LaunchIcon from '@mui/icons-material/Launch';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../context/auth/auth.context';

type Props = {};

const AvatarButton = (props: Props) => {
	const {
		authState: { user },
		authDispatch,
	} = useAuth();
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const router = useRouter();

	const jiraOptions = [
		{
			label: 'Profile',
			event: () => {
				router.push('/manage-profile');
			},
		},
		{
			label: 'Change password',
			event: () => {
				router.push('/manage-profile/password');
			},
		},
		{
			label: 'Log out',
			event: () => {
				authDispatch({
					type: 'LOGOUT',
				});
			},
		},
	];

	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<Box sx={{ flexGrow: 0, ml: 1 }}>
				<Tooltip title={user?.email || 'Settings'}>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							sx={{ width: 30, height: 30 }}
							src={`https://ui-avatars.com/api/?name=${user?.name}&bold=true&background=DE350B&color=fff`}
							alt={user?.email || 'Avatar'}
						>
							<PersonRoundedIcon />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<Box px={2} py={1}>
					<Typography
						variant="h6"
						sx={{ fontSize: 11, fontWeight: 700 }}
					>
						ACCOUNT
					</Typography>
					<Box display="flex" mt={2}>
						<Avatar
							src={`https://ui-avatars.com/api/?name=${user?.name}&bold=true&background=DE350B&color=fff`}
							alt={user?.email || 'Avatar'}
						>
							<PersonRoundedIcon />
						</Avatar>
						<Box ml={1}>
							<Typography sx={{ fontSize: 14 }}>
								{user?.name}
							</Typography>
							<Typography variant="caption">
								{user?.email}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Link href="/manage-profile">
					<MenuItem>
						<ListItemText disableTypography>
							Manage Account
						</ListItemText>
						<ListItemIcon>
							<LaunchIcon />
						</ListItemIcon>
					</MenuItem>
				</Link>

				<Divider />
				<Typography
					px={2}
					py={1}
					variant="h6"
					sx={{ fontSize: 11, fontWeight: 700 }}
				>
					UPGRADE
				</Typography>
				<MenuItem>
					<ListItemText disableTypography>
						Try the Standard plan
					</ListItemText>
					<Typography
						color="HighlightText"
						sx={{
							ml: 1,
							color: 'white',
							borderRadius: '3px',
							fontWeight: 700,
							p: '2px 3px',
							fontSize: 11,
							bgcolor: 'primary.main',
						}}
					>
						FREE 14-DAY TRIAL
					</Typography>
				</MenuItem>

				<Divider />

				<Typography
					px={2}
					py={1}
					variant="h6"
					sx={{ fontSize: 11, fontWeight: 700 }}
				>
					JIRA
				</Typography>
				{jiraOptions.map((option, i, arr) => (
					<div key={uuidv4()}>
						{arr.length - 1 === i && <Divider />}
						<MenuItem
							onClick={() => {
								option.event();
								handleCloseUserMenu();
							}}
						>
							{option.label}
						</MenuItem>
					</div>
				))}
			</Menu>
		</>
	);
};

export default AvatarButton;
