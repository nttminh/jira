import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: '#0052CC',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	components: {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: '14px',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						color: '#0052cc',
						backgroundColor: '#091e420a',
						borderRadius: '3px',
					},
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					fontSize: 14,
				},
			},
		},
	},
};

export const lightTheme = createTheme(lightThemeOptions);
