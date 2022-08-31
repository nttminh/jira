import { EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import * as React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NextPage } from 'next';

import ProtectedRoute from '../components/features/auth/ProtectedRoute';
import AppLayout from '../containers/AppLayout';
import { AuthProvider } from '../context/auth/auth.provider';
import { ProjectProvider } from '../context/project/project.provider';
import '../styles/globals.css';
import { lightTheme } from '../styles/theme/lightTheme';
import createEmotionCache from '../utility/createEmotionCache';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactElement;
	authDisabled?: boolean;
};
interface MyAppProps extends AppProps {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const getLayout =
		Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

	return (
		// <StyledEngineProvider injectFirst>
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<AuthProvider>
				<ProjectProvider>
					{!Component.authDisabled ? (
						<ProtectedRoute>
							{getLayout(<Component {...pageProps} />)}
						</ProtectedRoute>
					) : (
						<>{getLayout(<Component {...pageProps} />)}</>
					)}
				</ProjectProvider>
			</AuthProvider>
		</ThemeProvider>
		// </StyledEngineProvider>
	);
};

export default MyApp;
