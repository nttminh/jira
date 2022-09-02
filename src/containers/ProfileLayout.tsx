// import NextNProgress from "nextjs-progressbar";
import { Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';

import AppsIcon from '@mui/icons-material/Apps';
import HelpIcon from '@mui/icons-material/Help';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TriangleLogo from '../components/icons/TriangleLogo';
import Footer from './Footer';
import Header from './Header';
import ProfileMenuSide from './MenuSide/ProfileMenuSide';
// import { getUserClient } from '/apis/getUserClient';
// import LoadingScreen from '/components/LoadingScreen';
// import {
// 	PRIMARY_BACKGROUND_COLOR,
// 	PRIMARY_COLOR_HOVER,
// } from '/constants/style';
// import { AuthContext } from '/context/auth/auth.context';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	// const {
	// 	authState: { isAuthenticated, user },
	// 	authDispatch,
	// } = useContext(AuthContext);

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	return (
		<div
			style={{
				background: `url(/images/background.png) center no-repeat`,
				backgroundSize: 'cover',
			}}
		>
			{/* {loading && <LoadingScreen />} */}
			{/* <NextNProgress color={PRIMARY_COLOR_HOVER} height={5} /> */}
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Header></Header>

			<Grid container sx={{ height: '94vh', zIndex: -1 }}>
				{!isMobile && (
					<>
						<Grid item xs={0.5}>
							<Box
								p={2}
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									bgcolor: '#f4f5f7',
								}}
							>
								<Box>
									<IconButton
										size="small"
										onClick={() =>
											router.push('/manage-profile')
										}
									>
										<TriangleLogo />
									</IconButton>
								</Box>
								<Box>
									<IconButton size="small">
										<AppsIcon />
									</IconButton>
									<IconButton
										href="https://support.atlassian.com/"
										size="small"
									>
										<HelpIcon />
									</IconButton>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={1.5}>
							<ProfileMenuSide />
						</Grid>
					</>
				)}
				<Grid item xs>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						py={4}
					>
						{children}
					</Box>
				</Grid>
			</Grid>

			<div className=""></div>
			<Footer></Footer>
			{/* <ScrollToTop
				component={
					<KeyboardArrowUpIcon
						sx={{
							color: PRIMARY_BACKGROUND_COLOR,
							fontSize: 30,
							transform: 'translate(-1px, 2px)',
						}}
					/>
				}
				smooth
				width="18"
				height="18"
				color={PRIMARY_BACKGROUND_COLOR}
				style={{
					borderRadius: '50%',
					boxShadow: `16px 16px 32px #d9d9d9,
								-16px -16px 32px #ffffff;`,
				}}
			/> */}
		</div>
	);
};

export default ProfileLayout;
