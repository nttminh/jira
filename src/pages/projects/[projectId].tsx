import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProject } from '../../api/getProject';
import ProjectDetail from '../../components/ProjectList/ProjectDetail/ProjectDetail';
import { GetProjectDetailContent } from '../../interface/Project';
type Props = {};

const Project = (props: Props) => {
  const [project, setProject] = useState<GetProjectDetailContent>();
  const router = useRouter();
  const queryParams = router.query;
  const projectId = queryParams.projectId || 0;

  const getProjects = async () => {
    try {
      const res = await getProject().getAllProject();
      const pj = res?.data?.content.find((item: GetProjectDetailContent) => {
        return item.id + '' == projectId;
      });
      setProject(pj);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  return <ProjectDetail project={project} />;
};

export default Project;
