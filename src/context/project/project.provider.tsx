import { useReducer } from 'react';
import { GetProjectDetailContent } from '../../interface/Project';
import { ProjectContext } from './project.context';
const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
	currentProject: null,
};

function reducer(
	state: { currentProject: GetProjectDetailContent | null },
	action: any
) {
	switch (action.type) {
		case 'SET_PROJECT': {
			return {
				...state,
				currentProject: action.payload,
			};
		}
		default:
			return state;
	}
}

export const ProjectProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [projectState, projectDispatch] = useReducer(reducer, INITIAL_STATE);
	return (
		<ProjectContext.Provider
			value={{
				projectState: projectState,
				projectDispatch: projectDispatch,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};
