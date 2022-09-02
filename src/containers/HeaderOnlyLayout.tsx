// import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
// import { getUserClient } from '/apis/getUserClient';
// import LoadingScreen from '/components/LoadingScreen';
// import {
// 	PRIMARY_BACKGROUND_COLOR,
// 	PRIMARY_COLOR_HOVER,
// } from '/constants/style';
// import { AuthContext } from '/context/auth/auth.context';

const HeaderOnlyLayout = ({ children }: { children: React.ReactNode }) => {
	// const {
	// 	authState: { isAuthenticated, user },
	// 	authDispatch,
	// } = useContext(AuthContext);

	const [loading, setLoading] = useState(false);

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
			{children}

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

export default HeaderOnlyLayout;
