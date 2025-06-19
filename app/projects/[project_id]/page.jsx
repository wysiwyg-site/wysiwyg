import React from "react";
import ProjectDetails from "../../components/ProjectDetails"; // or whatever interval you prefer

const ProjectPage = ({ params }) => {
  const project = params.project_id;

  if (!project) return <p></p>;

  return (
    <div className=" overflow-hidden">
      <ProjectDetails project_id={project} />
    </div>
  );
};

export default ProjectPage;
