import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import NextNProgress from "nextjs-progressbar";
import React, { useContext, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuSide from "./MenuSide/MenuSide";
import Footer from "./Footer";
import Header from "./Header";
// import { getUserClient } from '/apis/getUserClient';
// import LoadingScreen from '/components/LoadingScreen';
// import {
// 	PRIMARY_BACKGROUND_COLOR,
// 	PRIMARY_COLOR_HOVER,
// } from '/constants/style';
// import { AuthContext } from '/context/auth/auth.context';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  // const {
  // 	authState: { isAuthenticated, user },
  // 	authDispatch,
  // } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const getUser = async () => {
    // 	setLoading(true);
    // 	if (isAuthenticated && !user) {
    // 		const res = await getUserClient().getUserInfo();
    // 		if (res?.success) {
    // 			const userInfo = res.data;
    // 			authDispatch({
    // 				type: 'UPDATE_USER',
    // 				payload: userInfo,
    // 			});
    // 		}
    // 	}
    // 	setLoading(false);
    // };
    // getUser();
  }, []);

  return (
    <div
      style={{
        background: `url(/images/background.png) center no-repeat`,
        backgroundSize: "cover",
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
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <MenuSide />
          </Grid>
          <Grid item xs={10}>
            {children}
          </Grid>
        </Grid>
      </Container>
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

export default AppLayout;
