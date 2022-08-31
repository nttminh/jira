import { createContext, Dispatch, useContext } from 'react';
import { GetProjectDetailContent } from '../../interface/Project';
const isBrowser = typeof window !== 'undefined';

export type projectContextType = {
	projectState: {
		currentProject: GetProjectDetailContent | null;
	};
	projectDispatch: Dispatch<any>;
};

const projectContextDefaultValues: projectContextType = {
	projectState: {
		currentProject: null,
	},
	projectDispatch: () => {},
};

export const ProjectContext = createContext(projectContextDefaultValues);

export const useProject = () => {
	const context = useContext(ProjectContext);
	if (context === undefined) {
		throw new Error('useProject must be used within a ProjectProvider');
	}
	return context;
};
