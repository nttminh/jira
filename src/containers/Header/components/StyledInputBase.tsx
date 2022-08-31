import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	border: '1px solid #DFE1E6',
	borderRadius: 3,
	fontSize: 14,
	'& .MuiInputBase-input': {
		padding: theme.spacing(0.5, 1, 0.5, 0),

		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '60ch',
			},
		},
	},
}));

export default StyledInputBase;
