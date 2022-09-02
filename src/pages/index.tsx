import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth/auth.context';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {

	return (
		<div>
			<Head>
				<title>Jira</title>
				<meta
					name="description"
					content="Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software."
				/>
			</Head>
			<h1>Index page</h1>
		</div>
	);
};

export default Home;
