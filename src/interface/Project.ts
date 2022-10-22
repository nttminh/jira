import {ReactNode} from "react";

export interface Project {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
}
export interface ProjectCategory {
  id: number;
  projectCategoryName: string;
}

export interface CreateProjectContent {
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
  deleted: boolean;
  creator: number;
}

export interface GetProjectDetailContent {
  lstTaskDeTail: any;
  statusName: ReactNode;
  lstTask: LstTask[];
  members: any[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  projectCategory: Creator;
  alias: string;
}

export interface Creator {
  id: number;
  name: string;
}

export interface LstTask {
  lstTaskDeTail: any[];
  statusId: string;
  statusName: string;
  alias: string;
}
