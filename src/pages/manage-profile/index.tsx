import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import ProfileLayout from '../../containers/ProfileLayout';
import { useAuth } from '../../context/auth/auth.context';

type Props = {};

const ManageProfile = (props: Props) => {
	const {
		authState: { user },
	} = useAuth();
	return (
		<Box>
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
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 500 }}>
					Profile photo and header image
				</Typography>
				<Card sx={{ maxWidth: 584 }}>
					<CardMedia
						component="img"
						height="140"
						image="https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/1.svg"
						alt="green iguana"
					/>
					<CardContent>
						<Box mt={-11}>
							<Avatar
								sx={{ width: 96, height: 96 }}
								src={user?.avatar}
								alt={user?.email || 'Avatar'}
							>
								{user?.name}
							</Avatar>
						</Box>
						<Typography variant="body2" color="text.secondary">
							Who can see your profile photo?
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Share</Button>
						<Button size="small">Learn More</Button>
					</CardActions>
				</Card>
			</Box>
		</Box>
	);
};

ManageProfile.getLayout = (page: ReactNode) => (
	<ProfileLayout>{page}</ProfileLayout>
);
export default ManageProfile;
