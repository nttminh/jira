import { KeyboardArrowDown } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
	AppBar,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import logoIconSVG from '../../../public/logoIcon.svg';
import { useAuth } from '../../context/auth/auth.context';
import AvatarButton from './components/AvatarButton';
import Search from './components/Search';
import SearchIconWrapper from './components/SearchIconWrapper';
import StyledInputBase from './components/StyledInputBase';

const Header = () => {
	const router = useRouter();
	const {
		authState: { isAuthenticated, user },
		authDispatch,
	} = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isOpen, setIsOpen] = React.useState(false);

	const handleOpenNavMenu = (event: any) => {
		setIsOpen(true);
	};
	const handleCloseNavMenu = (event: any) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setIsOpen(false);
	};
	const recordButtonPosition = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	let pages = [
		{
			label: 'Projects',
			url: '/projects',
			content: [
				{
					section: 'Recent',
					content: [
						{
							projectName: 'jira-clone (JC)',
							type: 'Software project',
							icon: 'https://jira-clone-cybersoft.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10417?size=medium',
						},
					],
				},
				{
					content: [
						{ label: 'View all projects', event: () => {} },
						{ label: 'Create project', event: () => {} },
					],
				},
			],
		},
		{ label: 'People', url: '/people' },
	];

	return (
		<AppBar position="static" color="inherit">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Button
							sx={{
								color: '#000',
								textTransform: 'capitalize',
								fontSize: 20,
							}}
							onClick={() => router.push('/')}
						>
							<Image
								src={logoIconSVG}
								width={30}
								height={30}
								alt="logo"
								priority
							/>
							Jira Software
						</Button>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						<Drawer
							anchor="left"
							open={isOpen}
							onClose={handleCloseNavMenu}
						>
							<Box
								sx={{
									width: 250,
								}}
								role="presentation"
								onClick={handleCloseNavMenu}
								onKeyDown={handleCloseNavMenu}
							>
								<List>
									{pages.map((page, index) => (
										<ListItem key={index} disablePadding>
											<ListItemButton>
												<ListItemText
													primary={page.label}
												/>
											</ListItemButton>
										</ListItem>
									))}
									<ListItem>
										<Button
											variant="contained"
											size="small"
											fullWidth
											onClick={() =>
												router.push('/createproject')
											}
										>
											Create
										</Button>
									</ListItem>
								</List>

								<Divider />
								<List>
									{[
										'Report bugs',
										'Terms and conditions',
										'Privacy policy',
									].map((text, index) => (
										<ListItem key={text} disablePadding>
											<ListItemButton>
												<ListItemText primary={text} />
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</Box>
						</Drawer>
					</Box>
					<Typography
						variant="h5"
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
						onClick={() => router.push('/')}
					>
						<Image
							src={logoIconSVG}
							width={40}
							height={40}
							alt="logo"
							priority
						/>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							ml: 2,
						}}
					>
						{pages.map((page, i) => (
							<React.Fragment key={i}>
								<Button
									onClick={recordButtonPosition}
									endIcon={<KeyboardArrowDown />}
								>
									{page.label}
								</Button>

								<Menu
									sx={{ mt: '45px', zIndex: 50 }}
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									// PaperProps={{
									// 	style: {
									// 		width: 320,
									// 	},
									// }}
								>
									<Typography px={2} py={1}>
										Will be updated
									</Typography>
									{/* <Box>
										{page.content?.map((part) => (
											<>
												{part.section && (
													<Box>{part.section}</Box>
												)}
												{part.content.map((element) => {
													if (element?.projectName) {
														return <Box></Box>;
													} else {
														return (
															<MenuItem></MenuItem>
														);
													}
												})}
											</>
										))}
									</Box> */}
								</Menu>
							</React.Fragment>
						))}
						<Button
							variant="contained"
							size="small"
							onClick={() => router.push('/createproject')}
						>
							Create
						</Button>
					</Box>

					<Search>
						<SearchIconWrapper>
							<SearchIcon fontSize="small" />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>

					<AvatarButton />
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
