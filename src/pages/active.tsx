import data from '../../public/data.json';
import Column from '../components/Column/Column';
import {Task} from "../interface/Task";

type Props = {};

const Active = (props: Props) => {
	const list: Task[] = data.tasks;

	return (
		<div>
			<h1>Project Title</h1>
			<div className="flex flex-row">
				<Column title="TO DO" list={list} />
				<Column title="DOING" list={list} />
				<Column title="TESTING" list={list} />
				<Column title="DONE" list={list} />
			</div>
		</div>
	);
};

export default Active;
