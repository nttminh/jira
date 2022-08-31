import { ArrowForwardIos } from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Icon,
	Typography,
} from '@mui/material';

type Props = {
	id: number;
	projectCategoryName: string;
	image: string;
	description: string;
	onClick?: () => void;
	handleChooseType?: (id: number) => void;
};

const CategoryCard = (props: Props) => {
	return (
		<Card
			sx={{ minWidth: { sx: '100%', lg: '700px' }, mt: 4 }}
			onClick={() => {
				if (props.onClick) {
					props.onClick();
				}
				if (props.handleChooseType) {
					props.handleChooseType(props.id);
				}
			}}
		>
			<CardActionArea sx={{ display: 'flex' }}>
				<CardMedia
					component="img"
					width={window.innerWidth >= 768 ? 200 : 90}
					sx={{
						objectFit: 'contain',
						bgcolor: '#F4F5F7',
						width: '45%',
					}}
					image={props.image}
					alt="project category"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.projectCategoryName}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.description}
					</Typography>
				</CardContent>
				<CardContent>
					<Icon>
						<ArrowForwardIos />
					</Icon>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CategoryCard;
