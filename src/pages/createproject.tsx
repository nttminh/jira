import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	Container,
	Paper,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CategoryCard from '../components/features/createProject/CategoryCard';
import HeaderOnlyLayout from '../containers/HeaderOnlyLayout';
import { useProject } from '../context/project/project.context';
import projectAPI from '../services/projectAPI';

type Props = {};

const categories = [
	{
		id: 1,
		projectCategoryName: 'Web Application',
		image: 'https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/kanban.svg',
		description:
			'Visualize and advance your project forward using issues on a powerful board.',
	},
	{
		id: 2,
		projectCategoryName: 'Desktop Application',
		image: 'https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/scrum.svg',
		description:
			'Visualize and advance your project forward using issues on a powerful board.',
	},
	{
		id: 3,
		projectCategoryName: 'Mobile Application',
		image: 'https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/bug.svg',
		description:
			'Visualize and advance your project forward using issues on a powerful board.',
	},
];

// createProject
const responseBody = {
	statusCode: 200,
	message: 'Xử lý thành công!',
	content: {
		id: 7117,
		projectName: 'string',
		description: 'string',
		categoryId: 1,
		alias: 'string',
		deleted: false,
		creator: 827,
	},
	dateTime: '2022-08-31T01:36:27.7931408+07:00',
};

const responseBodyError = {
	statusCode: 500,
	message: 'Dữ liệu không hợp lệ!',
	content: 'Project name already exists',
	dateTime: '2022-08-31T01:37:44.9849425+07:00',
};

const CreateProject = (props: Props) => {
	const schema = yup
		.object({
			ProjectName: yup.string().required(),
			Description: yup.string(),
		})
		.required();

	const {
		formState: { errors, isValid },
		control,
		trigger,
		handleSubmit,
		getValues,
		clearErrors,
	} = useForm({ resolver: yupResolver(schema) });
	const router = useRouter();
	const {
		projectState: { currentProject },
		projectDispatch,
	} = useProject();
	const [activeStep, setActiveStep] = useState(0);
	const [category, setCategory] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const handleNext = async () => {
		switch (activeStep) {
			case 0:
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				break;
			case 1:
				await trigger();
				if (getValues()['ProjectName'] != '') {
					clearErrors();
					setActiveStep((prevActiveStep) => prevActiveStep + 1);
				}
				break;
			case 2:
				console.log('activeStep', activeStep);
				console.log('isValid', isValid);
				handleSubmit(onSubmit)();

				break;
			default:
				break;
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleChooseType = (id: number) => {
		setCategory(id);
		handleNext();
	};

	const onSubmit = async (form: {
		ProjectName: string;
		Description: string;
	}) => {
		try {
			setIsLoading(true);
			const data = await projectAPI.createProject({
				alias: '',
				categoryId: category,
				projectName: form.ProjectName,
				description: form.Description,
      });
      projectDispatch({type: 'SET_PROJECT', payload: data.content})

			router.push('/');
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const steps = [
		{
			label: 'Choose your type of project',
			description: `Plan, track and release great software. Get up and running
					quickly with templates that suit the way your team works.
					Plus, integrations for DevOps teams that want to connect
					work across their entire toolchain.`,
			elements: (
				<>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						{categories.map((category) => (
							<CategoryCard
								key={category.id}
								{...category}
								handleChooseType={handleChooseType}
							/>
						))}
					</Box>
				</>
			),
		},
		{
			label: 'Add project details',
			description:
				'You can change these details anytime in your project settings.',
			elements: (
				<>
					<Controller
						name="ProjectName"
						defaultValue=""
						control={control}
						render={({ field }: any) => (
							<TextField
								error={!!errors?.ProjectName}
								label="Project Name"
								helperText={
									errors?.ProjectName?.message as ReactNode
								}
								type="text"
								required
								sx={{ display: 'block', my: 1 }}
								{...field}
							/>
						)}
					/>
					<Controller
						name="Description"
						defaultValue=""
						control={control}
						render={({ field }: any) => (
							<TextareaAutosize
								required
								minRows={5}
								style={{ minWidth: '100%', padding: 16 }}
								placeholder="Description"
								{...field}
							/>
						)}
					/>
				</>
			),
		},
		{
			label: 'Summary',
			description: `Take a final look at your incoming project`,
			elements: (
				<>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<CategoryCard
							key={category}
							{...categories[category - 1]}
							onClick={handleReset}
						/>
						<Typography variant="h6">
							Project Name: {getValues()['ProjectName']}
						</Typography>
						{getValues()['Description'] !== '' && (
							<Typography>
								Description: {getValues()['Description']}
							</Typography>
						)}
					</Box>
				</>
			),
		},
	];

	return (
		<Container maxWidth="xl">
			<Typography variant="h5" mt={2}>
				Create Project
			</Typography>

			<Box>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((step, index) => (
						<Step key={step.label}>
							<StepLabel
								optional={
									index === 2 ? (
										<Typography variant="caption">
											Last step
										</Typography>
									) : null
								}
							>
								{step.label}
							</StepLabel>
							<StepContent>
								<Typography variant="caption">
									{step.description}
								</Typography>
								{step.elements && step.elements}
								{index >= 1 && (
									<Box sx={{ mb: 2 }}>
										<div>
											<LoadingButton
												loading={isLoading}
												type="submit"
												variant="contained"
												onClick={handleNext}
												sx={{ mt: 1, mr: 1 }}
											>
												{index === steps.length - 1
													? 'Create'
													: 'Continue'}
											</LoadingButton>
											<Button
												disabled={index === 0}
												onClick={handleBack}
												sx={{ mt: 1, mr: 1 }}
											>
												Back
											</Button>
										</div>
									</Box>
								)}
							</StepContent>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} sx={{ p: 3 }}>
						<Typography>
							All steps completed - you&apos;re finished
						</Typography>
						<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
							Reset
						</Button>
					</Paper>
				)}
			</Box>
		</Container>
	);
};

CreateProject.getLayout = (page: ReactNode) => (
	<HeaderOnlyLayout>{page}</HeaderOnlyLayout>
);
export default CreateProject;
